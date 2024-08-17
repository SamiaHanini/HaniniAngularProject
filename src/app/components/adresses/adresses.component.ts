import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adresse } from '../../entities/adresse.entities';
import { AdressesService } from '../../services/adresses.service';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
})
export class AdressesComponent implements OnInit {

  adresses?: Adresse[];

  constructor(private adressesService: AdressesService, private router: Router) {}

  ngOnInit(): void {
  }

  onSearch(value: { id: number }) {
    this.adressesService.getAdresse(value.id).subscribe({
      next: data => {
        this.adresses = data ? [data] : [];
      }
    });
  }

  getAdresseByLocalite(value: { localite: string }) {
    this.adressesService.getAdresseByLocalite(value.localite).subscribe({
      next: data => {
        this.adresses = data;
      }
    });
  }

  showAll() {
    this.adressesService.getAllAdresses().subscribe({
      next: data => {
        this.adresses = data;
      }
    });
  }

  onEdit(adresse: Adresse) {
    this.router.navigate(['/editadresse', adresse.idadresse]);
  }

  
  onDelete(adresse: Adresse) {
    const confirmation = confirm('Are you sure you want to delete?');

    if (confirmation) {
      this.adressesService.deleteAdresse(adresse).subscribe({
        next: () => {
          const index = this.adresses?.indexOf(adresse);
          if (index !== undefined && index !== -1) {
            this.adresses?.splice(index, 1);
          }
          (window as any).sendAlert('success', 'Adresse deleted!');
        }
      });
    }
  }

  onNewAdresse() {
    this.router.navigate(['newadresse']);
  }
}
