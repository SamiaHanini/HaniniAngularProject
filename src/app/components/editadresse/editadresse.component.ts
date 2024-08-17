import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdressesService } from '../../services/adresses.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editadresse',
  templateUrl: './editadresse.component.html',
})
export class EditAdresseComponent implements OnInit {
  adresseFormGroup?: FormGroup;
  submitted = false;
  idadresse: number;

  constructor(private fb: FormBuilder, private adressesService: AdressesService, private route: ActivatedRoute, private router: Router) { 
    this.idadresse = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.adressesService.getAdresse(this.idadresse).subscribe(adresse => {
    this.adresseFormGroup = this.fb.group({
        idadresse: [adresse.idadresse],
        cp: [adresse.cp, [Validators.required, Validators.pattern('^[0-9]+$')]],
        localite: [adresse.localite, [Validators.required, Validators.pattern('^[a-zA-ZÀ-žÀ-ÿ ]*$')]],
        rue: [adresse.rue, [Validators.required, Validators.pattern('^[a-zA-ZÀ-žÀ-ÿ ]*$')]],
        num: [adresse.num, [Validators.required]],
        });
      }, error => {
          console.error('Error fetching client details:', error);
      });
    
  }

  onUpdateAdresse(): void {
    this.submitted = true;
    if (this.adresseFormGroup?.invalid) { return; }

    this.adressesService.updateAdresse(this.adresseFormGroup?.value).subscribe(
      data => {
        alert('Mise à jour réussie');
        this.router.navigate(['/adresses']);
      },
      err => {
        alert(err.headers.get('error'));
      }
    );
  }
}
