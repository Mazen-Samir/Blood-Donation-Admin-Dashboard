import { Component, OnInit, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-blood-inventory',
  imports: [ButtonModule, RatingModule, TableModule, TagModule, FormsModule, Dialog, InputTextModule],
  templateUrl: './blood-inventory.html',
  styleUrl: './blood-inventory.css',
})
export class BloodInventory {

  // FAKE BLOOD_INVENTORY DATA
  bloodInventory = [
    { 
      bloodType: 'A+',
      quantity: 45,
      status: 'AVAILABLE',
      expirtionDate: '2024-12-31' 
    },
    { 
      bloodType: 'A-',
      quantity: 15,
      status: 'LOW',
      expirtionDate: '2024-12-31' 
    },
    { 
      bloodType: 'B+',
      quantity: 25,
      status: 'LOW',
      expirtionDate: '2024-12-31' 
    },
    { 
      bloodType: 'B-',
      quantity: 58,
      status: 'AVAILABLE',
      expirtionDate: '2024-12-31' 
    },
    { 
      bloodType: 'AB-',
      quantity: 24,
      status: 'AVAILABLE',
      expirtionDate: '2024-12-31' 
    },
    { 
      bloodType: 'AB+',
      quantity: 30,
      status: 'LOW',
      expirtionDate: '2024-12-31' 
    },
    { 
      bloodType: 'O+',
      quantity: 5,
      status: 'CRITICAL',
      expirtionDate: '2024-12-31' 
    },
    { 
      bloodType: 'O-',
      quantity: 10,
      status: 'CRITICAL',
      expirtionDate: '2024-12-31' 
    },
  ]


    getSeverity(status: string) {
        switch (status) {
            case 'AVAILABLE':
                return 'success';
            case 'LOW':
                return 'warn';
            case 'CRITICAL':
                return 'danger';
            default:
                return 'secondary';

        }
    }

    // DIALOG CONFIGURATION

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

}
