import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdressesService } from '../../services/adresses.service';
import { Router } from '@angular/router';
import { Adresse } from '../../entities/adresse.entities';
import { Output } from '@angular/core';

@Component({
  selector: 'app-newadresse',
  templateUrl: './newadresse.component.html',
  styleUrls: ['./newadresse.component.css']
})

export class NewAdresseComponent implements OnInit {

  @Output() addedAdresse = new EventEmitter<Adresse>();
  adresseFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private adressesService: AdressesService, private router: Router) {}

  ngOnInit(): void {
      this.adresseFormGroup = this.fb.group({
      cp: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      localite: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      rue: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      num: ['', [Validators.required]],
    });
  }

  onSaveAdresse(): void {
    this.submitted = true;
    if (this.adresseFormGroup?.invalid) { return; }
    this.adressesService.saveAdresse(this.adresseFormGroup?.value).subscribe(
      data => {
        this.addedAdresse.emit(data);
        alert('Sauvegarde réussie');
        this.router.navigateByUrl('/adresses');
      }
    );

    this.adresseFormGroup?.reset();
  }
}
