import { Component } from '@angular/core';
import { TaxisService } from '../../services/taxis.service';
import { Taxi } from '../../entities/taxi.entities';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edittaxi',
  templateUrl: './edittaxi.component.html',
})
export class EditTaxiComponent {
  taxiFormGroup?: FormGroup;
  submitted = false;
  idtaxi: number;

  constructor(private fb: FormBuilder, private taxiService: TaxisService, private route: ActivatedRoute, private router: Router) {
    this.idtaxi = route.snapshot.params.id;
  }

  ngOnInit(): void {
  
    this.taxiService.getTaxi(this.idtaxi).subscribe(taxi => {
      this.taxiFormGroup = this.fb.group({
        idtaxi: [taxi.idtaxi],
        immatriculation: [taxi.immatriculation, [Validators.required, Validators.pattern('^[0-9]{1}-[A-Z]{3}-[0-9]{3}$')]],
        carburant: [taxi.carburant, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        prixkm: [taxi.prixkm, [Validators.required, Validators.pattern('^[0-9]*\.[0-9]{0,2}$')]],

      });
    }, error => {
      console.error('Error fetching taxi details:', error);
    });
  }
    


  onUpdateTaxi(): void {
    this.submitted = true;
    if (this.taxiFormGroup?.invalid) {
      console.log('Form is invalid');
      return;
    }
    if (this.taxiFormGroup) {
      this.taxiService.updateTaxi(this.taxiFormGroup.value).subscribe(
      data => {
        alert('Mise à jour réussie');
        this.router.navigate(['/taxis']);
      },
      err => {
        alert(err.headers.get('error'));
      }
    );
  }
}

}
