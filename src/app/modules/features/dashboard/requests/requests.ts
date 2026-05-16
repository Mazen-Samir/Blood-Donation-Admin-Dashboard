import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-requests',
  imports: [ButtonModule, RatingModule, TableModule, TagModule, FormsModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests {

  //FAKE REQUESTS DATA
  requests = [
    { 
      id: 1,
      patientName: "Ahmed Ali",
      bloodType: "O+",
      quantity: 2,
      status: "Pending",
      date: "2024-05-15",
      unregency: "Emergency"
    },
    { 
      id: 2,
      patientName: "Fatima Hassan",
      bloodType: "A-",
      quantity: 1,
      status: "Approved",
      date: "2024-05-16",
      unregency: "low"
    },
    { 
      id: 3,
      patientName: "Youssef Mahmoud",
      bloodType: "AB+",
      quantity: 3,
      status: "Rejected",
      date: "2024-05-17",
      unregency: "Emergency"
    },
    { 
      id: 1,
      patientName: "Ahmed Ali",
      bloodType: "O+",
      quantity: 2,
      status: "Pending",
      date: "2024-05-15",
      unregency: "Emergency"
    },
    { 
      id: 2,
      patientName: "Fatima Hassan",
      bloodType: "A-",
      quantity: 1,
      status: "Approved",
      date: "2024-05-16",
      unregency: "low"
    },
    { 
      id: 3,
      patientName: "Youssef Mahmoud",
      bloodType: "B+",
      quantity: 3,
      status: "Rejected",
      date: "2024-05-17",
      unregency: "Emergency"
    },
    { 
      id: 1,
      patientName: "Ahmed Ali",
      bloodType: "O+",
      quantity: 2,
      status: "Pending",
      date: "2024-05-15",
      unregency: "Emergency"
    },
    { 
      id: 2,
      patientName: "Fatima Hassan",
      bloodType: "A-",
      quantity: 1,
      status: "Approved",
      date: "2024-05-16",
      unregency: "low"
    },
    { 
      id: 3,
      patientName: "Youssef Mahmoud",
      bloodType: "B+",
      quantity: 3,
      status: "Rejected",
      date: "2024-05-17",
      unregency: "Emergency"
    },
    { 
      id: 1,
      patientName: "Ahmed Ali",
      bloodType: "O+",
      quantity: 2,
      status: "Pending",
      date: "2024-05-15",
      unregency: "Emergency"
    },
    { 
      id: 2,
      patientName: "Fatima Hassan",
      bloodType: "A-",
      quantity: 1,
      status: "Approved",
      date: "2024-05-16",
      unregency: "low"
    },
    { 
      id: 3,
      patientName: "Youssef Mahmoud",
      bloodType: "B+",
      quantity: 3,
      status: "Rejected",
      date: "2024-05-17",
      unregency: "Emergency"
    },
  ];

  getSeverity(status: string) {
      switch (status) {
          case 'Approved':
              return 'success';
          case 'Pending':
              return 'warn';
          case 'Rejected':
              return 'danger';
          default:
              return 'secondary';

      }
  }

}
