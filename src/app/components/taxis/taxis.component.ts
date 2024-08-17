import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Taxi } from '../../entities/taxi.entities';
import { TaxisService } from '../../services/taxis.service';
import { Client } from '../../entities/client.entities';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
})
export class TaxisComponent implements OnInit {
  taxis?: Taxi[];
  loading = false;
  selectedTaxiId?: number;
  kmtotal?: number[];
  montanttotal?: number[];
 
  constructor(private taxisService: TaxisService, private router: Router) {

  }

  ngOnInit(): void {
    
  }

  onSearch(value: { id: number }) {
    this.taxisService.getTaxi(value.id).subscribe({
      next: data => {
        this.taxis = data ? [data] : [];
      }
    });
  }

  getTaxisByImmatriculation(value: { immatriculation: string }) {
    this.loading = true;
    this.taxisService.getTaxisByImmatriculation(value.immatriculation).subscribe({
      next: data => {
        this.taxis = data ? [data] : [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


  getClientsForTaxi(taxiId: number): void {
    if (taxiId) {
      this.loading = true;
      this.router.navigate(['/clients', { taxiId }]); 
    }
  }

  getLocationsForTaxi(taxiId: number): void {
    if (taxiId) {
      this.loading = true;
      this.router.navigate(['/locations', { taxiId }]); 
    }
  }

  getKmtotal(): void {

    this.loading = true;
    if(this.taxis){
    this.taxisService.getKmTotal(this.taxis.map(t=>t.idtaxi)).subscribe({
      next: data => {
        console.log(data);
        this.kmtotal = data;
      },
      complete: () => {
        this.loading = false;
      }
    });
    }
  }

  getMontantTotal(): void {

    this.loading = true;
    if(this.taxis){
    this.taxisService.getMontantTotal(this.taxis.map(t=>t.idtaxi)).subscribe({
      next: data => {
        console.log(data);
        this.montanttotal = data;
      },
      complete: () => {
        this.loading = false;
      }
    });
    }
  }

  showAll() {

    this.loading = true;
    this.taxisService.getAllTaxis().subscribe({
      next: data => {
        this.taxis = data;
      },
      complete: () => {
        this.loading = false;
        this.getKmtotal();
        this.getMontantTotal();
      }
    });
  }

  onEdit(taxi: Taxi) {
    this.router.navigate(['/edittaxi', taxi.idtaxi]);
  }

  onDelete(taxi: Taxi) {
    const confirmation = confirm('Are you sure you want to delete?');

    if (confirmation) {
      this.taxisService.deleteTaxi(taxi).subscribe({
        next: () => {
          const index = this.taxis?.indexOf(taxi);
          if (index !== undefined && index !== -1) {
            this.taxis?.splice(index, 1);
          }
          (window as any).sendAlert('success', 'Taxi deleted!');
        }
      });
    }
  }

  onNewTaxi() {
    this.router.navigate(['newtaxi']);
  }
}