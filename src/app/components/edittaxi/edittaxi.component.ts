import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxisService } from '../../services/taxis.service';

@Component({
  selector: 'app-edittaxi',
  templateUrl: './edittaxi.component.html',
  styleUrls: ['./edittaxi.component.css']
})
export class EditTaxiComponent implements OnInit {
  taxiFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private taxiService: TaxisService) { }

  ngOnInit(): void {
    this.taxiFormGroup = this.fb.group({
      immatriculation: ['', Validators.required],
      carburant: ['', Validators.required],
      prixkm: ['', [Validators.required, Validators.min(0)]],    });
  }

  onUpdateTaxi(): void {
    this.submitted = true;
    if (this.taxiFormGroup?.invalid) { return; }

    this.taxiService.updateTaxi(this.taxiFormGroup?.value).subscribe(
      data => alert('Mise à jour réussie'),
      err => alert(err.headers.get('error'))
    );
  }
}
