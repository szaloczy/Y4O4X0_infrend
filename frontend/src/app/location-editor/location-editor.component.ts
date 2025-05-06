import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { LocationDTO } from '../../types';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';

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
  toastService = inject(ToastService);
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
    code: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    active: [true, [Validators.required]]
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

    if (this.locationForm.valid) {
      if (this.isNewLocation) {
        this.locationService.create(locationData).subscribe({
          next: () => {
            this.router.navigateByUrl('/');
            this.toastService.showSuccess('Helyszín létrehozása sikeres');
          },
          error: (err) => {
            this.toastService.showError(err.error.message);
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
            this.toastService.showSuccess('Helyszín módosítás sikeres');
          },
          error: (err) => {
            this.toastService.showError(err.error.message);
            console.error(err);
          }
        });
      }
    }
  }
}
