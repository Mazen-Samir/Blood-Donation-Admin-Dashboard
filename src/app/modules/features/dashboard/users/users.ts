import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-users',
  imports: [ButtonModule, RatingModule, TableModule, TagModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  // FAKE USERS DATA
  users = [
    {
      name: 'John Deo',
      bloodType: 'A+',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 450,
    },
    {
      name: 'John Deo',
      bloodType: 'AB+',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 440,
    },
    {
      name: 'John Deo',
      bloodType: 'A+',
      lastDonation: '2024-01-15',
      status: 'INACTIVE',
      phone: '123-456-7890',
      points: 660,
    },
    {
      name: 'John Deo',
      bloodType: 'A+',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 480,
    },
    {
      name: 'John Deo',
      bloodType: 'O+',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 410,
    },
    {
      name: 'John Deo',
      bloodType: 'B+',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 250,
    },
    {
      name: 'John Deo',
      bloodType: 'AB-',
      lastDonation: '2024-01-15',
      status: 'INACTIVE',
      phone: '123-456-7890',
      points: 150,
    },
    {
      name: 'John Deo',
      bloodType: 'A-',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 450,
    },
    {
      name: 'John Deo',
      bloodType: 'O-',
      lastDonation: '2024-01-15',
      status: 'INACTIVE',
      phone: '123-456-7890',
      points: 320,
    },
    {
      name: 'John Deo',
      bloodType: 'A+',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 50,
    },
    {
      name: 'John Deo',
      bloodType: 'B-',
      lastDonation: '2024-01-15',
      status: 'ACTIVE',
      phone: '123-456-7890',
      points: 100,
    },
  ]

    getSeverity(status: string) {
        switch (status) {
            case 'ACTIVE':
                return 'success';
            case 'INACTIVE':
                return 'danger';
            default:
                return 'secondary';

        }
    }

}
