import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../../entities/location.entities';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
})
export class LocationsComponent implements OnInit {
  locations?: Location[];

  constructor(private locationsService: LocationsService, private router: Router) {}

  ngOnInit(): void {
  }

  onSearch(value: { id: number }) {
    this.locationsService.getLocation(value.id).subscribe({
      next: data => {
        this.locations = data ? [data] : [];
      }
    });
  }

  showAll() {
    this.locationsService.getAllLocations().subscribe({
      next: data => {
        this.locations = data;
      }
    });
  }

  onEdit(location: Location) {
    this.router.navigateByUrl('editLocation/' + location.id);
  }

  onDelete(location: Location) {
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
        this.router.navigateByUrl('newLocation');
        }
     }
