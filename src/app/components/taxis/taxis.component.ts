import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Taxi } from '../../entities/taxi.entities';
import { TaxisService } from '../../services/taxis.service';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent implements OnInit{

  taxis?: Taxi[];
  loading = false;


  constructor(private taxisService: TaxisService, private router: Router) {}

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

  showAll() {
    this.taxisService.getAllTaxis().subscribe({
      next: data => {
        this.taxis = data;
      }
    });
  }


  onEdit(taxi: Taxi) {
    this.router.navigateByUrl('editTaxi/' + taxi.id);
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
    this.router.navigateByUrl('newTaxi');
  }
}
