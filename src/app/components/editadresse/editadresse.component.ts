import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdressesService } from '../../services/adresses.service';

@Component({
  selector: 'app-editadresse',
  templateUrl: './editadresse.component.html',
  styleUrls: ['./editadresse.component.css']
})
export class EditAdresseComponent implements OnInit {
  adresseFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private adressesService: AdressesService) { }

  ngOnInit(): void {
    this.adresseFormGroup = this.fb.group({
      cp: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      localite: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      rue: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      num: ['', [Validators.required]],
    });
  }

  onUpdateAdresse(): void {
    this.submitted = true;
    if (this.adresseFormGroup?.invalid) { return; }

    this.adressesService.updateAdresse(this.adresseFormGroup?.value).subscribe(
      data => alert('Mise à jour réussie'),
      err => alert(err.headers.get('error'))
    );
  }
}
