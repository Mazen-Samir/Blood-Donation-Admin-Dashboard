import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { HospitalsService } from '../../../../Core/Services/hospitals';
import { Hospital, CreateHospitalRequest } from '../../../../Core/interface/api-models';

@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.css',
})
export class Hospitals implements OnInit, OnDestroy {
  private hospitalsService = inject(HospitalsService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  hospitals: Hospital[] = [];
  filteredHospitals: Hospital[] = [];
  isLoading = false;
  searchQuery = '';

  showDialog = false;
  isEditMode = false;
  isSaving = false;
  selectedId: number | null = null;

  form: CreateHospitalRequest = { name: '', email: '', phoneNumber: '', address: '' };

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadHospitals();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadHospitals(): void {
    this.isLoading = true;
    this.hospitalsService.getAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        // API may return array directly or a wrapped object with a data/items property
        const list: Hospital[] = Array.isArray(res)
          ? res
          : (res?.data ?? res?.items ?? res?.hospitals ?? []);
        this.hospitals = list;
        this.filteredHospitals = [...list];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message ?? 'Failed to load hospitals.', life: 4000 });
      },
    });
  }

  onSearch(value: string): void {
    this.searchQuery = value;
    const q = value.toLowerCase().trim();
    this.filteredHospitals = q
      ? this.hospitals.filter(h =>
          h.name?.toLowerCase().includes(q) ||
          h.email?.toLowerCase().includes(q) ||
          h.address?.toLowerCase().includes(q))
      : [...this.hospitals];
  }

  openCreateDialog(): void {
    this.isEditMode = false;
    this.selectedId = null;
    this.form = { name: '', email: '', phoneNumber: '', address: '' };
    this.showDialog = true;
  }

  openEditDialog(hospital: Hospital): void {
    this.isEditMode = true;
    this.selectedId = hospital.id;
    this.form = { name: hospital.name, email: hospital.email, phoneNumber: hospital.phoneNumber, address: hospital.address };
    this.showDialog = true;
  }

  saveHospital(): void {
    if (!this.form.name.trim() || !this.form.email.trim() || !this.form.phoneNumber.trim() || !this.form.address.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'All fields are required.', life: 3000 });
      return;
    }

    this.isSaving = true;
    const request$ = this.isEditMode && this.selectedId !== null
      ? this.hospitalsService.update(this.selectedId, this.form)
      : this.hospitalsService.create(this.form);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.isSaving = false;
        this.showDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.isEditMode ? 'Hospital updated.' : 'Hospital created.', life: 3000 });
        this.loadHospitals();
      },
      error: (err) => {
        this.isSaving = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message ?? 'Operation failed.', life: 4000 });
      },
    });
  }

  confirmDelete(hospital: Hospital): void {
    this.confirmationService.confirm({
      message: `Delete hospital "<strong>${hospital.name}</strong>"? This cannot be undone.`,
      header: 'Delete Hospital',
      icon: 'fa-solid fa-triangle-exclamation',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteHospital(hospital.id),
    });
  }

  private deleteHospital(id: number): void {
    this.hospitalsService.delete(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Hospital deleted.', life: 3000 });
        this.loadHospitals();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message ?? 'Failed to delete.', life: 4000 });
      },
    });
  }
}
