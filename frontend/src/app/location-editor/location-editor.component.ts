import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { LocationDTO } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-editor',
  imports: [
    FormsModule
  ],
  templateUrl: './location-editor.component.html',
  styleUrl: './location-editor.component.css'
})
export class LocationEditorComponent implements OnInit {
  locationService = inject(LocationService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  location: LocationDTO = {
    id: 0,
    code: '',
    name: '',
    address: '',
    active: true
  }

  isNewLocation = true;

  ngOnInit(): void {
    const locationId = this.activatedRoute.snapshot.params['id'];

    if(locationId) {
      this.isNewLocation = false;
      this.locationService.getOne(locationId).subscribe({
        next: (location) => {
          this.location = location;
          console.log(location)
        },
        error: (err) => {
          this.router.navigateByUrl('/');
          console.error(err);
        }
      });
    }
  }
  

  saveLocation() {
    if (this.isNewLocation) {
      this.locationService.create(this.location).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.locationService.update(this.location).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
   
  }
}
