import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  router = inject(Router);

  location: LocationDTO = {
    id: 0,
    code: '',
    name: '',
    address: '',
    active: true
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

  saveLocation() {
    this.locationService.create(this.location).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
