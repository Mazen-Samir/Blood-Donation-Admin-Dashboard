import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-blood-data',
  imports: [ButtonModule, RatingModule, TableModule, TagModule, FormsModule],
  templateUrl: './blood-data.html',
  styleUrl: './blood-data.css',
})
export class BloodData {

  //FAKE BLOOD DATA
  blood_data = [
    {
      donorId: "U-1001",
      donationId: "DON-1001",
      donorName: "Ahmed Ali",
      date: "2026-04-15",
      time: "10:30 AM",
      bloodType: "O+",
      quantity: 450,
    },
    {
      donorId: "U-1004",
      donationId: "DON-1004",
      donorName: "Shehab Khaled",
      date: "2026-04-20",
      time: "90:00 AM",
      bloodType: "AB+",
      quantity: 500,
    },
    {
      donorId: "U-1001",
      donationId: "DON-1001",
      donorName: "Ahmed Ali",
      date: "2026-04-15",
      time: "10:30 AM",
      bloodType: "O+",
      quantity: 450,
    },
    {
      donorId: "U-1004",
      donationId: "DON-1004",
      donorName: "Shehab Khaled",
      date: "2026-04-20",
      time: "90:00 AM",
      bloodType: "AB+",
      quantity: 500,
    },
    {
      donorId: "U-1001",
      donationId: "DON-1001",
      donorName: "Ahmed Ali",
      date: "2026-04-15",
      time: "10:30 AM",
      bloodType: "O+",
      quantity: 450,
    },
    {
      donorId: "U-1004",
      donationId: "DON-1004",
      donorName: "Shehab Khaled",
      date: "2026-04-20",
      time: "90:00 AM",
      bloodType: "AB+",
      quantity: 500,
    },
    {
      donorId: "U-1001",
      donationId: "DON-1001",
      donorName: "Ahmed Ali",
      date: "2026-04-15",
      time: "10:30 AM",
      bloodType: "O+",
      quantity: 450,
    },
    {
      donorId: "U-1004",
      donationId: "DON-1004",
      donorName: "Shehab Khaled",
      date: "2026-04-20",
      time: "90:00 AM",
      bloodType: "AB+",
      quantity: 500,
    },
    {
      donorId: "U-1001",
      donationId: "DON-1001",
      donorName: "Ahmed Ali",
      date: "2026-04-15",
      time: "10:30 AM",
      bloodType: "O+",
      quantity: 450,
    },
    {
      donorId: "U-1004",
      donationId: "DON-1004",
      donorName: "Shehab Khaled",
      date: "2026-04-20",
      time: "90:00 AM",
      bloodType: "AB+",
      quantity: 500,
    },
    {
      donorId: "U-1001",
      donationId: "DON-1001",
      donorName: "Ahmed Ali",
      date: "2026-04-15",
      time: "10:30 AM",
      bloodType: "O+",
      quantity: 450,
    },
    {
      donorId: "U-1004",
      donationId: "DON-1004",
      donorName: "Shehab Khaled",
      date: "2026-04-20",
      time: "90:00 AM",
      bloodType: "AB+",
      quantity: 500,
    },
    
  ]

}
