import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { Router } from '@angular/router';
import { Client } from '../../entities/client.entities';
import { Taxi } from '../../entities/taxi.entities';
import { Adresse } from '../../entities/adresse.entities';


@Component({
  selector: 'app-newlocation',
  templateUrl: './newlocation.component.html',
})
export class NewLocationComponent implements OnInit {

  @Output() addedLocation = new EventEmitter<any>();
  locationFormGroup?: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder, private locationsService: LocationsService, private router: Router) {}

  ngOnInit(): void {
    this.locationFormGroup = this.fb.group({
      dateLoc: ['', [Validators.required, this.validateDate]],
      kmtotal: ['', [Validators.required, Validators.min(1)]],
      acompte: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSaveLocation() {
    this.submitted = true;
    if (this.locationFormGroup?.invalid) {
      return;
    }
    this.locationsService.saveLocation(this.locationFormGroup?.value).subscribe(
      data => {
        alert('Sauvegarde réussie');
        this.router.navigateByUrl('/locations');
      },
      error => {
        console.error(error);
      }
    );

    this.locationFormGroup?.reset();
  }

  onAddedClient(client: Client) {
    console.log('Nouveau client ajouté :', client);
  }

  onAddedTaxi(taxi: Taxi) {
    console.log('Nouveau taxi ajouté');
  }

  onAddedAdresse(adresse: Adresse) {
    console.log('Nouvelle adresse ajoutée');
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
