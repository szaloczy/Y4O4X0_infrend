import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { LocationDTO } from '../../types';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-editor',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './location-editor.component.html',
  styleUrl: './location-editor.component.css'
})
export class LocationEditorComponent implements OnInit {
  locationService = inject(LocationService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  locationForm!: FormGroup;

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

  this.locationForm = this.formBuilder.group({
    code: [''],
    name: [''],
    address: [''],
    active: [true]
  });

  if (locationId) {
    this.isNewLocation = false;
    this.locationService.getOne(locationId).subscribe({
      next: (location) => {
        this.location = location;
        this.locationForm.patchValue({
          code: location.code,
          name: location.name,
          address: location.address,
          active: location.active
        });
      },
      error: (err) => {
        this.router.navigateByUrl('/');
        console.error(err);
      }
    });
  }
  }
  

  saveLocation() {
    const locationData = this.locationForm.value;

  if (this.isNewLocation) {
    this.locationService.create(locationData).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
      }
    });
  } else {
    this.locationService.update({
      id: this.location.id,
      ...locationData
    }).subscribe({
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
