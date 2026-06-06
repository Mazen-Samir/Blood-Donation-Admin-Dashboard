import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { InventoryService } from '../../../../Core/Services/inventory';
import { BloodInventoryItem } from '../../../../Core/interface/api-models';

/** All eight ABO/Rh blood types — always shown, even if the hospital
 *  has no bags for that type (filled with quantity 0). */
const ALL_BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

@Component({
  selector: 'app-blood-inventory',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    Dialog,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './blood-inventory.html',
  styleUrl: './blood-inventory.css',
})
export class BloodInventory implements OnInit {
  private inventoryService = inject(InventoryService);
  private messageService = inject(MessageService);

  /** Always 8 rows — one per blood type. Missing types get quantity 0. */
  bloodInventory: BloodInventoryItem[] = [];
  isLoading = false;
  visible = false;

  // ─── Stats from res.dashboard ─────────────────────────────────────────────────
  statTotalUnits = 0;
  statHigh       = 0;
  statLow        = 0;
  statCritical   = 0;

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.isLoading = true;
    this.inventoryService.getHospitalInventory().subscribe({
      next: (res: any) => {
        const dash = res?.dashboard ?? {};
        this.statTotalUnits = dash.totalUnits ?? 0;
        this.statHigh       = dash.high      ?? 0;
        this.statLow        = dash.low       ?? 0;
        this.statCritical   = dash.critical  ?? 0;

        const raw: BloodInventoryItem[] = Array.isArray(res?.inventory)
          ? res.inventory
          : [];

        this.bloodInventory = this.mergeAllTypes(raw);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message ?? 'Failed to load blood inventory.',
          life: 4000,
        });
      },
    });
  }

  /** Merges API data into the full 8-type list. Missing types get quantity 0. */
  private mergeAllTypes(data: BloodInventoryItem[]): BloodInventoryItem[] {
    return ALL_BLOOD_TYPES.map(type =>
      data.find(b => b.bloodType?.replace('_', '') === type) ?? ({
        bloodType: type,
        quantity: 0,
        nearestExpiryDate: '—',
        status: 'Empty',
      } as BloodInventoryItem)
    );
  }

  /** Maps status → .status-pill modifier. Status is title-case from API. */
  getStatusClass(status: string): string {
    switch ((status ?? '').toLowerCase()) {
      case 'high':     return 's-approved';
      case 'low':      return 's-pending';
      case 'critical': return 's-emergency';
      default:         return 's-inactive';
    }
  }

  showDialog(): void {
    this.visible = true;
  }
}