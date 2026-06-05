import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { RewardsService } from '../../../../Core/Services/rewards';
import { Reward, CreateRewardRequest } from '../../../../Core/interface/api-models';

@Component({
  selector: 'app-rewards',
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
    InputNumberModule,
    TextareaModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './rewards.html',
  styleUrl: './rewards.css',
})
export class Rewards implements OnInit, OnDestroy {
  private rewardsService = inject(RewardsService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  rewards: Reward[] = [];
  rewardById: Reward | null = null;
  isLoading = false;

  showDialog = false;
  showDetailsDialog = false;
  isEditMode = false;
  isSaving = false;
  selectedRewardId: number | null = null;

  form: CreateRewardRequest = { title: '', description: '', pointsRequired: 0 };

  private destroy$ = new Subject<void>();

  get minPoints(): string {
    if (!this.rewards.length) return '—';
    return String(Math.min(...this.rewards.map((r) => r.pointsRequired)));
  }

  get maxPoints(): string {
    if (!this.rewards.length) return '—';
    return String(Math.max(...this.rewards.map((r) => r.pointsRequired)));
  }

  ngOnInit(): void {
    this.loadRewards();
    this.loadRewardById(1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRewards(): void {
    this.isLoading = true;
    this.rewardsService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.rewards = data ?? [];
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message ?? 'Failed to load rewards.',
            life: 4000,
          });
        },
      });
  }

  loadRewardById(id: number): void {
    this.rewardsService.getById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.rewardById = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message ?? 'Failed to load reward.',
          life: 4000,
        });
      },
    });
  }

  openCreateDialog(): void {
    this.isEditMode = false;
    this.selectedRewardId = null;
    this.form = { title: '', description: '', pointsRequired: 0 };
    this.showDialog = true;
  }

  openEditDialog(reward: Reward): void {
    this.isEditMode = true;
    this.selectedRewardId = reward.id;
    this.form = { title: reward.title, description: reward.description, pointsRequired: reward.pointsRequired };
    this.showDialog = true;
  }

  openDetailsDialog(reward: Reward): void {
    this.loadRewardById(reward.id);
    this.showDetailsDialog = true;
  }

  saveReward(): void {
    if (!this.form.title.trim() || !this.form.description.trim() || this.form.pointsRequired <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'All fields are required and points must be greater than 0.',
        life: 3000,
      });
      return;
    }

    this.isSaving = true;

    const request$ = this.isEditMode && this.selectedRewardId !== null
      ? this.rewardsService.update(this.selectedRewardId, this.form)
      : this.rewardsService.create(this.form);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.isSaving = false;
        this.showDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.isEditMode ? 'Reward updated successfully.' : 'Reward created successfully.',
          life: 3000,
        });
        this.loadRewards();
      },
      error: (err) => {
        this.isSaving = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message ?? 'Operation failed.',
          life: 4000,
        });
      },
    });
  }

  confirmDelete(reward: Reward): void {
    this.confirmationService.confirm({
      message: `Delete reward "<strong>${reward.title}</strong>"? This action cannot be undone.`,
      header: 'Delete Reward',
      icon: 'fa-solid fa-triangle-exclamation',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteReward(reward.id),
    });
  }

  private deleteReward(id: number): void {
    this.rewardsService
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Reward deleted successfully.',
            life: 3000,
          });
          this.loadRewards();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message ?? 'Failed to delete reward.',
            life: 4000,
          });
        },
      });
  }
}
