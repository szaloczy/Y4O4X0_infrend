import { Component, inject, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import { LocationDTO } from '../../types';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  locationService = inject(LocationService);
  router = inject(Router);

  locations: LocationDTO[] = [];

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteLocation(index: number) {
    const location = this.locations[index];

    this.locationService.delete(location.id).subscribe({
      next: () => {
        this.locations.splice(index, 1);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  navigateToAddClientForm(id: number) {
    this.router.navigate(['add-client', id]);
  }

  navigateToLocationForm(id: number) {
    this.router.navigate(['edit-location', id]);
  }

  toggleLocationActive(locationId: number, currentStatus: boolean) {
    const newStatus = !currentStatus;
    this.locationService.updateActiveStatus(locationId, newStatus).subscribe({
      next: (updatedLocation) => {
        const locIndex = this.locations.findIndex(loc => loc.id === locationId);
        if (locIndex !== -1) {
          this.locations[locIndex].active = updatedLocation.active;
        }
      },
      error: (err) => {
        console.error('Hiba az állapot frissítésekor:', err);
      }
    });
  }
}
