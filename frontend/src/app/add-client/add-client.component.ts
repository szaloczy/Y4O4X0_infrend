import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { ClientDTO, LocationDTO } from '../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { DonationService } from '../services/donation.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-add-client',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit{
  formType: 'donation' | 'newClient' = 'donation';

  donationForm!: FormGroup;
  newClientForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  clientService = inject(ClientService);
  locationService = inject(LocationService);
  donationService = inject(DonationService);
  activatedRoute = inject(ActivatedRoute);
  toastService = inject(ToastService);

  location: LocationDTO = {
    id: 0,
    code: '',
    name: '',
    address: '',
    active: false
  };
  clients: ClientDTO[] = []; 

  ngOnInit(): void {

    const locationId = this.activatedRoute.snapshot.params['id'];

    if(locationId) {
      this.locationService.getOne(locationId).subscribe({
        next: (location) => {
          this.location = location;
        },
        error: (err) => {
          console.error(err);
        }
      })
    }

    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (err) => {
        console.error(err);
      }
    })

    this.donationForm = this.fb.group({
      location: ['', Validators.required],
      client: ['', Validators.required],
      date: [this.todayDate(), Validators.required],
      eligible: ['true', Validators.required],
      reason: [''],
      doctor: ['', [Validators.required]],
      controlled: ['false', [Validators.required]],
      patient_fullname: ['',],
      patient_taj: [0, [Validators.pattern(/^\d{9}$/), this.validateTajNumber()]]
    });

    this.donationForm.get('eligible')?.valueChanges.subscribe(value => {
      const controlledButton = this.donationForm.get('controlled');
      if(value === 'false') {
        controlledButton?.setValue('false');
        controlledButton?.disable();
      } else {
        controlledButton?.enable();
      }
    }); 

    this.newClientForm = this.fb.group({
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      citizenship: ['', Validators.required],
      birthplace: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      address: ['', Validators.required],
      taj_number: ['', [Validators.required, Validators.pattern(/^\d{9}$/), this.validateTajNumber()]]
    });

    this.onEligibilityChange();
    this.onDirectedChange();
  }

  onSubmit() {
    if (this.formType === 'donation') {
      if (this.donationForm.valid) {
        console.log('Véradás mentése:', this.donationForm.value);
        this.donationService.create(this.donationForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.toastService.showSuccess('Véradás sikeresen rögzítve');
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            this.toastService.showError(err.error.message);
            console.error(err);
          }
        })
      } else {
        this.donationForm.markAllAsTouched();
      }
    } else {
      if (this.newClientForm.valid) {
        console.log('Új véradó mentése:', this.newClientForm.value);
        this.clientService.create(this.newClientForm.value).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/');
            this.toastService.showSuccess('Új véradó sikeresen létrehozva');
          },
          error: (err) => {
            this.toastService.showError(err.error.message);
            console.error(err);
          }
        })
      } else {
        this.newClientForm.markAllAsTouched();
      }
    }
  }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  validateTajNumber(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      if (!value) return null;
  
      const tajStr = value.toString().trim();
      
      if (!/^\d{9}$/.test(tajStr)) {
        return { invalidFormat: true };
      }
  
      const digits = tajStr.split('').map(Number);
      
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += digits[i] * (i % 2 === 0 ? 3 : 7);
      }
      const cdv = sum % 10;
      
      return cdv === digits[8] ? null : { invalidChecksum: true };
    };
  }

  onEligibilityChange() {
    this.donationForm.get('eligible')?.valueChanges.subscribe((value: boolean) => {
      const reason = this.donationForm.get('reason');
      const directed = this.donationForm.get('controlled');
  
      if (value === false) {
        reason?.setValidators([Validators.required]);
        directed?.setValue(false);
        directed?.disable();
      } else {
        reason?.clearValidators();
        directed?.enable();
      }
  
      reason?.updateValueAndValidity();
      directed?.updateValueAndValidity();
    });
  }
  
  onDirectedChange() {
    this.donationForm.get('controlled')?.valueChanges.subscribe((value: boolean) => {
      const patientName = this.donationForm.get('patient_fullname');
      const patientTaj = this.donationForm.get('patient_taj');
  
      if (value === true) {
        patientName?.setValidators([Validators.required]);
        patientTaj?.setValidators([
          Validators.required,
          Validators.pattern(/^\d{9}$/)
        ]);
      } else {
        patientName?.clearValidators();
        patientTaj?.clearValidators();
      }
  
      patientName?.updateValueAndValidity();
      patientTaj?.updateValueAndValidity();
    });
  }
}
