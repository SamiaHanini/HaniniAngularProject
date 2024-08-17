import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../entities/client.entities';
import { Taxi } from '../../entities/taxi.entities';
import { Adresse } from '../../entities/adresse.entities';
import { ClientsService } from '../../services/clients.service';
import { TaxisService } from '../../services/taxis.service';
import { AdressesService } from '../../services/adresses.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-newlocation',
  templateUrl: './newlocation.component.html',
})
export class NewLocationComponent implements OnInit {

  @Output() addedLocation = new EventEmitter<any>();
  locationFormGroup?: FormGroup;
  submitted = false;
  idlocation: number;
  clients: Client[] = [];
  taxis: Taxi[] = [];
  adresses: Adresse[] = [];

  constructor(
    private fb: FormBuilder, 
    private locationService: LocationsService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private clientService: ClientsService, 
    private taxiService: TaxisService,
    private adresseService: AdressesService
  ) {
    this.idlocation = route.snapshot.params.id;

    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
    this.taxiService.getAllTaxis().subscribe((taxis) => {
      this.taxis = taxis;
    });
    this.adresseService.getAllAdresses().subscribe((adresses) => {
      this.adresses = adresses;
    });
  }

  ngOnInit(): void {
    this.locationFormGroup = this.fb.group({
      dateloc: ['', [Validators.required, this.validateDate]],
      kmtotal: ['', [Validators.required, Validators.min(1)]],
      acompte: ['', [Validators.required, Validators.min(0)]],
      taxifk: ['', Validators.required],
      clientfk: ['', Validators.required],
      adressedepart: ['', Validators.required],
      adressefin: ['', Validators.required],
    }, { validator: this.addressesNotSame });

  }

  onSaveLocation(): void {
    this.submitted = true;
    if (this.locationFormGroup?.invalid) {
      return;
    }
    if (this.locationFormGroup) {
      const datelocValue = new Date(this.locationFormGroup.get('dateloc')?.value);
      datelocValue.setHours(0, 0, 0, 0);
      this.locationFormGroup.patchValue({ dateloc: datelocValue });

      const taxifkId = this.locationFormGroup.get('taxifk')?.value;
      const clientfkId = this.locationFormGroup.get('clientfk')?.value;
      const adressedepartId = this.locationFormGroup.get('adressedepart')?.value;
      const adressefinId = this.locationFormGroup.get('adressefin')?.value;

      forkJoin([
        this.taxiService.getTaxi(taxifkId),
        this.clientService.getClient(clientfkId),
        this.adresseService.getAdresse(adressedepartId),
        this.adresseService.getAdresse(adressefinId)
      ]).subscribe(([taxi, client, adresseDepart, adresseFin]) => {
        if (this.locationFormGroup) {
          this.locationFormGroup.patchValue({
            taxifk: taxi,
            clientfk: client,
            adressedepart: adresseDepart,
            adressefin: adresseFin
          });

          this.locationService.saveLocation(this.locationFormGroup?.value).subscribe(
            data => {
              this.addedLocation.emit(data);
              alert('Sauvegarde réussie');
              this.router.navigate(['/locations']);
            },
            err => {
              console.error('Error saving location:', err);
            }
          );

          this.locationFormGroup?.reset();
        }
      }, error => {
        console.error('Error fetching entities:', error);
      });
    }
  }

  validateDate(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { 'invalidDate': true };
    }

    return null;
  }

  addressesNotSame(group: FormGroup): ValidationErrors | null {
    const adressedepart = group.get('adressedepart')?.value;
    const adressefin = group.get('adressefin')?.value;

    if (adressedepart && adressefin && adressedepart === adressefin) {
      return { 'addressesSame': true };
    }

    return null;
  }
}
