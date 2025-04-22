import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { ClientDTO } from '../../types';

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
  clientService = inject(ClientService);

  clients: ClientDTO[] = []; 

  ngOnInit(): void {

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
      donor: ['', Validators.required],
      date: [this.todayDate(), Validators.required],
      eligible: ['yes', Validators.required],
      reason: [''],
      doctor: ['', Validators.required],
      directed: ['no', Validators.required],
      patientName: [''],
      patientTaj: ['']
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
        // API hívás stb.
      } else {
        this.donationForm.markAllAsTouched();
      }
    } else {
      if (this.newClientForm.valid) {
        console.log('Új véradó mentése:', this.newClientForm.value);
        this.clientService.create(this.newClientForm.value).subscribe({
          next: (res) => {
            console.log('OK');
            console.log(res);
          },
          error: (err) => {
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
      
      // 1. Alap formai ellenőrzés
      if (!/^\d{9}$/.test(tajStr)) {
        return { invalidFormat: true };
      }
  
      const digits = tajStr.split('').map(Number);
      
      // 2. CDV számjegy ellenőrzése
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += digits[i] * (i % 2 === 0 ? 3 : 7);
      }
      const cdv = sum % 10;
      
      return cdv === digits[8] ? null : { invalidChecksum: true };
    };
  }

  onEligibilityChange() {
    this.donationForm.get('eligible')?.valueChanges.subscribe(value => {
      const reason = this.donationForm.get('reason');
      const directed = this.donationForm.get('directed');

      if (value === 'no') {
        reason?.setValidators([Validators.required]);
        directed?.setValue('no');
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
    this.donationForm.get('directed')?.valueChanges.subscribe(value => {
      const patientName = this.donationForm.get('patientName');
      const patientTaj = this.donationForm.get('patientTaj');

      if (value === 'yes') {
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
