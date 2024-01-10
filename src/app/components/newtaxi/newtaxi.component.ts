import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TaxisService } from '../../services/taxis.service';
import { Router } from '@angular/router';
import { Taxi } from '../../entities/taxi.entities';

@Component({
  selector: 'app-newtaxi',
  templateUrl: './newtaxi.component.html',
})

export class NewTaxiComponent {
  @Output() addedTaxi = new EventEmitter<Taxi>();
  taxiFormGroup?: FormGroup;
  submitted = false;
  id: number | null = null;

  constructor(private fb: FormBuilder, private taxiService: TaxisService, private router: Router) {
  }

  ngOnInit(): void {
    this.taxiFormGroup = this.fb.group({
      immatriculation: ['', Validators.required],
      carburant: ['', Validators.required],
      prixkm: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSaveTaxi(): void {
    this.submitted = true;
    if (this.taxiFormGroup?.invalid) { return; }
    this.taxiService.saveTaxi(this.taxiFormGroup?.value).subscribe(
      data => {
        this.addedTaxi.emit(data);
        alert('Sauvegarde réussie');
        this.router.navigateByUrl('/taxis');
      }
    );

    this.taxiFormGroup?.reset();
  }
}
