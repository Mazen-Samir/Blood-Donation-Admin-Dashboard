import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-scaning',
  imports: [ZXingScannerModule, NgIf],
  templateUrl: './scaning.html',
  styleUrl: './scaning.css',
})
export class Scaning {

  constructor(private router: Router){} 

  isLoading = true;
  hasError = false;
  errorMessage = '';

  onCamerasFound() {
    this.isLoading = false;
    this.hasError = false;
  }

  onScanError(error: any) {
    this.isLoading = false;
    this.hasError = true;
    this.errorMessage = 'Camera access denied or not available';
    console.error(error);
  }

  onScanSuccess(result: string){
    console.log('Scan result:', result);

    // PLAY AUDIO
    const audio = new Audio("assets/mp3/beep.mp3");
    audio.play();

    setTimeout(() => {

      // Navigate to the QR details page after a successful scan
      this.router.navigate(['/dashboard/scanning/qr-details']);

    }, 1000); // Delay to ensure the beep plays after the scan


    // PATH DATA
    // const qrData = JSON.parse(result);
  }

}
