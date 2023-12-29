import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.css']
})
export class EditLocationComponent implements OnInit {
  locationFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private locationService: LocationsService) { }

  ngOnInit(): void {
    this.locationFormGroup = this.fb.group({
      dateLoc: ['', [Validators.required, this.validateDate]],
      kmtotal: ['', [Validators.required, Validators.min(1)]],
      acompte: ['', [Validators.required, Validators.min(1)]],
    });
  }

  updateLocation(): void {
    this.submitted = true;
    if (this.locationFormGroup?.invalid) { return; }

    this.locationService.updateLocation(this.locationFormGroup?.value).subscribe(
      data => alert('Mise à jour réussie'),
      err => alert(err.headers.get('error'))
    );
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
