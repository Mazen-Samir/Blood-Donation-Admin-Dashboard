import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { QRCodeComponent } from 'angularx-qrcode';

import { DonationsService } from '../../../../Core/Services/donations';
import { Donation, QrTokenResponse } from '../../../../Core/interface/api-models';

@Component({
  selector: 'app-blood-data',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TagModule,
    FormsModule,
    ToastModule,
    DialogModule,
    QRCodeComponent,
  ],
  providers: [MessageService],
  templateUrl: './blood-data.html',
  styleUrl: './blood-data.css',
})
export class BloodData implements OnInit, OnDestroy {
  private donationsService = inject(DonationsService);
  private messageService = inject(MessageService);

  blood_data: Donation[] = [];
  isGeneralDonation = false;
  isLoading = false;

  // Pagination
  totalRecords = 0;
  pageSize = 6;
  currentPage = 1;
  totalDonations = 0;
  totalQuantity = 0;

  // ─── Pick-up QR dialog ────────────────────────────────────────────────────────
  qrDialogVisible = false;
  qrLoading = false;      // first load (full spinner)
  qrRefreshing = false;   // silent background refresh
  qrDonationId: number | null = null;
  qrToken = '';
  qrImageBase64 = '';

  /** Pickup tokens are short-lived, so re-fetch while the dialog is open. */
  private readonly QR_REFRESH_MS = 14 * 60 * 1000; // 14 minutes
  private qrTimer?: ReturnType<typeof setInterval>;

  // Derived stats
  get totalVolume(): number {
    return this.blood_data.reduce((sum, d) => sum + (d.quantity ?? 0), 0);
  }
  get averagePerDonation(): number {
    if (!this.blood_data.length) return 0;
    return Math.round(this.totalVolume / this.blood_data.length);
  }

  ngOnInit(): void {
    this.loadDonations();
  }

  loadDonations(): void {
    this.isLoading = true;

    this.donationsService
      .getAllDonations({ currentPage: this.currentPage, pageSize: this.pageSize })
      .subscribe({
        next: (res) => {
          this.blood_data = res.donations.data ?? [];
          this.totalRecords = res.donations.totalCount ?? 0;
          this.totalDonations = res.statistics.totalDonations;
          this.totalQuantity = res.statistics.totalQuantity;
          this.isLoading = false;
          ;
          
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message ?? 'Failed to load donation data.',
            life: 4000,
          });
        },
      });
  }

  // ─── Pick-up QR ───────────────────────────────────────────────────────────────
  /** Opens the dialog, fetches the QR, and starts the 14-min auto-refresh. */
  openQr(donation: Donation): void {
    this.qrDonationId = donation.id;
    this.qrToken = '';
    this.qrImageBase64 = '';
    this.qrDialogVisible = true;
    this.fetchQr(true);
    this.startQrRefresh();
  }

  /** Manual "Refresh now" — resets the 14-min cycle too. */
  refreshQr(): void {
    if (this.qrDonationId == null) return;
    this.fetchQr(false);
    this.startQrRefresh();
  }

  /** GET /api/hospital/donations/{id}/pickup-qr. showLoading=true on first open. */
  private fetchQr(showLoading: boolean): void {
    if (this.qrDonationId == null) return;
    if (showLoading) {
      this.qrLoading = true;
    } else {
      // Clear the displayed QR so the @else-if condition drops the old element
      // from the DOM — guarantees a fresh remount with the new token.
      this.qrRefreshing = true;
      this.qrToken = '';
      this.qrImageBase64 = '';
    }

    this.donationsService.getGeneralDonationQr(this.qrDonationId).subscribe({
      next: (res: QrTokenResponse) => {
        this.qrToken = res.qrToken ?? '';
        this.qrImageBase64 = res.qrImageBase64 ?? '';
        this.qrLoading = false;
        this.qrRefreshing = false;
      },
      error: (err) => {
        this.qrLoading = false;
        this.qrRefreshing = false;
        // On first-open failure, close & stop. A failed silent refresh keeps the old QR.
        if (showLoading) {
          this.qrDialogVisible = false;
          this.stopQrRefresh();
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message ?? 'Could not load the pick-up QR.',
          life: 4000,
        });
      },
    });
  }

  private startQrRefresh(): void {
    this.stopQrRefresh();
    this.qrTimer = setInterval(() => this.fetchQr(false), this.QR_REFRESH_MS);
  }

  /** Called on dialog (onHide) and ngOnDestroy. */
  stopQrRefresh(): void {
    if (this.qrTimer) {
      clearInterval(this.qrTimer);
      this.qrTimer = undefined;
    }
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.currentPage = Math.floor(event.first / event.rows) + 1;
    this.pageSize = event.rows;
    this.loadDonations();
  }

  ngOnDestroy(): void {
    this.stopQrRefresh();
  }
}