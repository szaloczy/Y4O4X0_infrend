import { Component, inject, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import { LocationDTO, UserDTO } from '../../types';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  locationService = inject(LocationService);
  authService = inject(AuthService);
  userService = inject(UserService);
  toastService = inject(ToastService);
  router = inject(Router);

  locations: LocationDTO[] = [];
  users: UserDTO[] = [];

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteLocation(index: number) {
    const location = this.locations[index];

    this.locationService.delete(location.id).subscribe({
      next: () => {
        this.locations.splice(index, 1);
        this.toastService.showSuccess('Helyszín sikeresen törölve');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteUser(index: number) {
    const user = this.users[index];

    this.userService.delete(user.id).subscribe({
      next: () => {
        this.users.splice(index, 1);
        this.toastService.showSuccess('Felhasználó sikeresen törölve');
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
