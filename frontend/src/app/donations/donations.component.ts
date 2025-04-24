import { Component, inject, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ClientDTO, DonationDTO, LocationDTO } from '../../types';
import { ClientService } from '../services/client.service';
import { DonationService } from '../services/donation.service';

@Component({
  selector: 'app-donations',
  imports: [],
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent implements OnInit {

  locationService = inject(LocationService);
  clientService = inject(ClientService);
  donationService = inject(DonationService);

  locations: LocationDTO[] = [];
  clients: ClientDTO[] = [];
  donations: DonationDTO[] = [];

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.donationService.getAll().subscribe({
      next: (donations) => {
        this.donations = donations;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
