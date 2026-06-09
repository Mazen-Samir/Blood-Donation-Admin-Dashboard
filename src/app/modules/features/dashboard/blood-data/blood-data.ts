import { AuthService } from './../../../../Core/Services/auth';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService, LazyLoadEvent } from 'primeng/api';
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
  private authService = inject(AuthService);
  blood_data: Donation[] = [];
  isGeneralDonation = false;
  isLoading = false;
  isAppAdmin = false;

  // Pagination
  totalRecords = 0;
  pageSize = 6;
  currentPage = 1;
  totalDonations = 0;
  totalQuantity = 0;
  averagePerDonation = 0;

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

  ngOnInit(): void {
    console.log('[BloodData] Component initialized');
    this.loadDonations();
    this.isAppAdmin = this.authService.isAppAdmin();

  }

  loadDonations(): void {
    this.isLoading = true;
    
    console.log('[BloodData] ========== LOADING DONATIONS ==========');
    console.log('[BloodData] currentPage:', this.currentPage);
    console.log('[BloodData] pageSize:', this.pageSize);

    this.donationsService
      .getAllDonations({ currentPage: this.currentPage, pageSize: this.pageSize })
      .subscribe({
        next: (res) => {
          console.log('[BloodData] ===== RESPONSE RECEIVED =====');
          console.log('[BloodData] Response:', res);
          console.log('[BloodData] donations.data.length:', res.donations.data?.length);
          console.log('[BloodData] totalCount:', res.donations.totalCount);
          console.log('[BloodData] statistics:', res.statistics);

          this.blood_data = res.donations.data ?? [];
          this.totalRecords = res.donations.totalCount ?? 0;
          this.totalDonations = res.statistics.totalDonations;
          this.totalQuantity = res.statistics.totalQuantity;
          
          // Calculate average per donation
          if (this.blood_data.length > 0) {
            const totalVol = this.blood_data.reduce((sum, d) => sum + (d.quantity ?? 0), 0);
            this.averagePerDonation = Math.round(totalVol / this.blood_data.length);
          } else {
            this.averagePerDonation = 0;
          }
          
          this.isLoading = false;
          console.log('[BloodData] State updated. Showing', this.blood_data.length, 'donations');
        },
        error: (err) => {
          this.isLoading = false;
          console.error('[BloodData] Error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message ?? 'Failed to load donation data.',
            life: 4000,
          });
        },
      });
  }

  // ─── Pagination ─────────────────────────────────────────────────────────────
  onPageChange(event: LazyLoadEvent): void {
    console.log('[BloodData] ===== PAGE CHANGE EVENT =====');
    console.log('[BloodData] Raw event:', event);
    console.log('[BloodData] event.first:', event.first);
    console.log('[BloodData] event.rows:', event.rows);

    if (!event) {
      console.warn('[BloodData] Event is null/undefined!');
      return;
    }

    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize;

    this.currentPage = Math.floor(first / rows) + 1;
    this.pageSize = rows;

    console.log('[BloodData] Calculated currentPage:', this.currentPage);
    console.log('[BloodData] Calculated pageSize:', this.pageSize);

    this.loadDonations();
  }

  // ─── Pick-up QR ───────────────────────────────────────────────────────────────
  /** Opens the dialog, fetches the QR, and starts the 14-min auto-refresh. */
  openQr(donation: Donation): void {
    console.log('[BloodData] Opening QR dialog for donation:', donation.id);
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
    console.log('[BloodData] Manually refreshing QR for donation:', this.qrDonationId);
    this.fetchQr(false);
    this.startQrRefresh();
  }

  /** GET /api/hospital/donations/{id}/pickup-qr. showLoading=true on first open. */
  private fetchQr(showLoading: boolean): void {
    if (this.qrDonationId == null) return;
    
    if (showLoading) {
      console.log('[BloodData] Fetching QR (initial load)...');
      this.qrLoading = true;
    } else {
      console.log('[BloodData] Refreshing QR (silent)...');
      // Clear the displayed QR so the @else-if condition drops the old element
      // from the DOM — guarantees a fresh remount with the new token.
      this.qrRefreshing = true;
      this.qrToken = '';
      this.qrImageBase64 = '';
    }

    this.donationsService.getGeneralDonationQr(this.qrDonationId).subscribe({
      next: (res: QrTokenResponse) => {
        console.log('[BloodData] QR fetched successfully:', res);
        this.qrToken = res.qrToken ?? '';
        this.qrImageBase64 = res.qrImageBase64 ?? '';
        this.qrLoading = false;
        this.qrRefreshing = false;
      },
      error: (err) => {
        this.qrLoading = false;
        this.qrRefreshing = false;
        console.error('[BloodData] QR fetch error:', err);
        
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

  ngOnDestroy(): void {
    console.log('[BloodData] Component destroyed');
    this.stopQrRefresh();
  }
}