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

import { HospitalAdminsService } from '../../../../Core/Services/hospital-admins';
import { HospitalsService } from '../../../../Core/Services/hospitals';
import { HospitalAdmin, UpdateHospitalAdminRequest, CreateHospitalAdminRequest, Hospital } from '../../../../Core/interface/api-models';

@Component({
  selector: 'app-hospital-admins',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, TableModule,
    ToastModule, DialogModule, ConfirmDialogModule, InputTextModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './hospital-admins.html',
  styleUrl: './hospital-admins.css',
})
export class HospitalAdmins implements OnInit, OnDestroy {
  private adminsService = inject(HospitalAdminsService);
  private hospitalsService = inject(HospitalsService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  admins: HospitalAdmin[] = [];
  filteredAdmins: HospitalAdmin[] = [];
  hospitals: Hospital[] = [];
  isLoading = false;
  hospitalsLoading = false;
  searchQuery = '';

  showDialog = false;
  isEditMode = false;
  isSaving = false;
  selectedId: string | null = null;

  createForm: CreateHospitalAdminRequest = { fullName: '', email: '', phoneNumber: '', password: '', hospitalId: 0 };
  editForm: UpdateHospitalAdminRequest = { fullName: '', email: '', phoneNumber: '', hospitalId: 0 };

  private destroy$ = new Subject<void>();

  ngOnInit(): void { this.loadAdmins(); this.loadHospitals(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  private extractList(res: any): any[] {
    if (Array.isArray(res)) return res;
    if (res && typeof res === 'object') {
      for (const key of ['data', 'items', 'admins', 'hospitalAdmins', 'hospitals', 'result', 'value', 'records']) {
        if (Array.isArray(res[key])) return res[key];
      }
    }
    return [];
  }

  loadAdmins(): void {
    this.isLoading = true;
    this.adminsService.getAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        console.log('[HospitalAdmins] admins raw:', res);
        this.admins = this.extractList(res);
        this.filteredAdmins = [...this.admins];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('[HospitalAdmins] admins error:', err);
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message ?? err?.message ?? 'Failed to load admins.', life: 6000 });
      },
    });
  }

  loadHospitals(): void {
    this.hospitalsLoading = true;
    this.hospitalsService.getAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        console.log('[HospitalAdmins] hospitals raw:', res);
        this.hospitals = this.extractList(res);
        console.log('[HospitalAdmins] hospitals parsed:', this.hospitals);
        this.hospitalsLoading = false;
      },
      error: (err) => {
        console.error('[HospitalAdmins] hospitals error status:', err?.status, 'message:', err?.error?.message ?? err?.message);
        this.hospitalsLoading = false;
        this.messageService.add({ severity: 'warn', summary: 'Hospitals', detail: 'Could not load hospitals list: ' + (err?.error?.message ?? err?.message ?? err?.status ?? 'unknown error'), life: 8000 });
      },
    });
  }

  getHospitalName(id: number): string {
    return this.hospitals.find(h => h.id === id)?.name ?? `Hospital #${id}`;
  }

  onSearch(value: string): void {
    this.searchQuery = value;
    const q = value.toLowerCase().trim();
    this.filteredAdmins = q
      ? this.admins.filter(a =>
          a.fullName?.toLowerCase().includes(q) ||
          a.email?.toLowerCase().includes(q) ||
          a.phoneNumber?.toLowerCase().includes(q))
      : [...this.admins];
  }

  openCreateDialog(): void {
    this.isEditMode = false;
    this.selectedId = null;
    this.createForm = { fullName: '', email: '', phoneNumber: '', password: '', hospitalId: 0 };
    this.showDialog = true;
  }

  openEditDialog(admin: HospitalAdmin): void {
    this.isEditMode = true;
    this.selectedId = admin.id;
    this.editForm = {
      fullName: admin.fullName,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      hospitalId: admin.hospitalId,
    };
    this.showDialog = true;
    console.log('Editing admin:', admin);
  }

  saveAdmin(): void {
    if (this.isEditMode) {
      if (!this.editForm.fullName.trim() || !this.editForm.email.trim() ||
          !this.editForm.phoneNumber.trim() || !this.editForm.hospitalId) {
        this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'All fields are required.', life: 3000 });
        return;
      }
      this.isSaving = true;
      const body: UpdateHospitalAdminRequest = {
        fullName: this.editForm.fullName,
        email: this.editForm.email,
        phoneNumber: this.editForm.phoneNumber,
        hospitalId: this.editForm.hospitalId,
      };
      this.adminsService.update(this.selectedId!, body).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.onSaveSuccess(),
        error: (err) => this.onSaveError(err),
      });
    } else {
      if (!this.createForm.fullName.trim() || !this.createForm.email.trim() ||
          !this.createForm.phoneNumber.trim() || !this.createForm.password.trim() || !this.createForm.hospitalId) {
        this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'All fields are required.', life: 3000 });
        return;
      }
      this.isSaving = true;
      this.adminsService.create(this.createForm).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.onSaveSuccess(),
        error: (err) => this.onSaveError(err),
      });
    }
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.showDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.isEditMode ? 'Admin updated.' : 'Admin created.', life: 3000 });
    this.loadAdmins();
  }

  private onSaveError(err: any): void {
    this.isSaving = false;
    const detail = err?.error?.message ?? err?.error?.title ?? err?.message ?? 'Operation failed.';
    this.messageService.add({ severity: 'error', summary: 'Error', detail, life: 6000 });
  }

  confirmDelete(admin: HospitalAdmin): void {
    this.confirmationService.confirm({
      message: `Delete admin "<strong>${admin.fullName}</strong>"? This cannot be undone.`,
      header: 'Delete Admin',
      icon: 'fa-solid fa-triangle-exclamation',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.adminsService.delete(admin.id).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Admin deleted.', life: 3000 });
          this.loadAdmins();
        },
        error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message ?? 'Failed to delete.', life: 4000 }),
      }),
    });
  }
}
