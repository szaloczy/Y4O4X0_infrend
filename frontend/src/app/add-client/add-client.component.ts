import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  ngOnInit(): void {
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
      name: ['', Validators.required],
      gender: ['', Validators.required],
      citizenship: ['', Validators.required],
      birthPlace: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      taj: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });

    this.onEligibilityChange();
    this.onDirectedChange();
  }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
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
