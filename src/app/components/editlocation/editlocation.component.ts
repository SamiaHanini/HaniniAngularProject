import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
})
export class EditLocationComponent implements OnInit {
  locationFormGroup?: FormGroup;
  submitted = false;
  idlocation: number;
  clients:Client[]=[];
  taxis:Taxi[]=[];
  adresses:Adresse[]=[];

  constructor(private fb: FormBuilder, private locationService: LocationsService, private route: ActivatedRoute, private router: Router, private clientService:ClientsService, private taxiService:TaxisService,private adresseService:AdressesService) {
    this.idlocation = route.snapshot.params.id;

    this.clientService.getAllClients().subscribe((clients)=>{
          this.clients=clients;
        });
        this.taxiService.getAllTaxis().subscribe((taxis)=>{
          this.taxis=taxis;
        });
        this.adresseService.getAllAdresses().subscribe((adresses)=>{
          this.adresses=adresses;
        });
   }

   ngOnInit(): void {
    this.locationService.getLocation(this.idlocation).subscribe(location => {
      this.locationFormGroup = this.fb.group({
        idlocation: [location.idlocation],
        dateloc: [location.dateloc, [Validators.required, this.validateDate]],
        kmtotal: [location.kmtotal, [Validators.required, Validators.min(1)]],
        acompte: [location.acompte, [Validators.required, Validators.min(0)]],
        taxifk: [location.taxifk.idtaxi],
        clientfk: [location.clientfk.idclient],
        adressedepart: [location.adressedepart.idadresse],
        adressefin: [location.adressefin.idadresse],
      });
    }, error => {
      console.error('Error fetching location details:', error);
    });
  }


  updateLocation(): void {
    this.submitted = true;
  
    if(this.locationFormGroup && this.locationFormGroup.valid){

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
  
          this.locationService.updateLocation(this.locationFormGroup?.value).subscribe(
            data => {
              alert('Mise à jour réussie');
              this.router.navigate(['/locations']);
            },
            err => {
              alert(err.headers.get('error'));
            }
          );
        } 
      }, (error: any) => {
        console.error('Error fetching entities:', error);
      });
    }
  }
  

  
  validateDate(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { 'invalidDate': true };
    }

    return null;
  }
}
