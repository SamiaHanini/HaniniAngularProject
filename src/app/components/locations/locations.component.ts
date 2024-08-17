import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationEntity } from '../../entities/location.entities';
import { LocationsService } from '../../services/locations.service';
import { TaxisService } from '../../services/taxis.service';
import { ClientsService } from '../../services/clients.service';
import { Taxi } from '../../entities/taxi.entities';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
})
export class LocationsComponent implements OnInit {
  locations?: LocationEntity[];
  idtaxi: number;
  idclient: number;
  loading = false;
  taxis?: Taxi[];



  constructor(private locationsService: LocationsService, private router: Router, private activeroute: ActivatedRoute, private taxisService: TaxisService, private clientsService: ClientsService) {
    this.idtaxi = this.activeroute.snapshot.params.taxiId;
      if (this.idtaxi) {
        this.loading = true;
        this.taxisService.getLocationsForTaxi(this.idtaxi).subscribe({
          next: data => {
            this.locations = data;
          },
          complete: () => {
            this.loading = false;
          }
        });
      }

      this.idclient = this.activeroute.snapshot.params.clientId;
      if (this.idclient) {
        this.loading = true;
        this.clientsService.getLocationsForClient(this.idclient).subscribe({
          next: data => {
            this.locations = data;
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
  }

  ngOnInit(): void {
      this.loading = true;
      this.taxisService.getAllTaxis().subscribe({
      next: data => {
        this.taxis = data;
      },
      complete: () => {
        this.loading = false;
      }
   });
  }

  onSearch(value: { id: number }) {
    this.locationsService.getLocation(value.id).subscribe({
      next: data => {
        this.locations = data ? [data] : [];
      }
    });
  }

  onSearchDatesAndTaxi(formValue: any) {
    const idTaxi = formValue.idTaxi;
    const startDate = formValue.startDate;
    const endDate = formValue.endDate;
  
    if (idTaxi && startDate && endDate) {
      this.locationsService.getLocationsForTaxiInPeriod(idTaxi, startDate, endDate).subscribe({
        next: data => {
          this.locations = data;
        },
        error: err => {
          console.error('Error fetching locations', err);
        }
      });
    } else {
      console.log('Invalid input values');
    }
  }
  

  onSearchDate(value: any) {
    if(value.dateloc) {
      this.locationsService.getLocationByDate(value.dateloc).subscribe({
        next: data => {
          this.locations = data;
        }
      });
    } 
  }

  showAll() {
    this.locationsService.getAllLocations().subscribe({
      next: data => {
        this.locations = data;
      }
    });
  }

  onEdit(location: LocationEntity) {
    this.router.navigate(['/editlocation', location.idlocation]);
    
  }

  onDelete(location: LocationEntity) {
    const confirmation = confirm('Are you sure you want to delete?');

    if (confirmation) {
      this.locationsService.deleteLocation(location).subscribe({
        next: () => {
          const index = this.locations?.indexOf(location);
          if (index !== undefined && index !== -1) {
            this.locations?.splice(index, 1);
          }
          (window as any).sendAlert('success', 'Location deleted!');
                  },
           });
          }
        }

    onNewLocation() {
        this.router.navigate(['newlocation']);
        }
     }

    
