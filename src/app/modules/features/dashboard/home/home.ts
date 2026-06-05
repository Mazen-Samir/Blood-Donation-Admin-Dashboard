import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import {RequestsService} from "../../../../Core/Services/requests";
import { BloodRequest } from '../../../../Core/interface/api-models';
import { InventoryService } from '../../../../Core/Services/inventory';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private requestsService = inject(RequestsService);
  private inventoryService = inject(InventoryService);

  TotalRequests: any = 0;
  TotalInventory: any = 0;


  ngOnInit(): void {
    this.loadRequestsData();
    // this.lodeInventoryData();
  }

  loadRequestsData (): void {
    this.requestsService
      .getAllRequests({ currentPage: 2, pageSize: 7 })
      .subscribe({
        next: (res: any) => {
          const { data, total } = this.extractList<BloodRequest>(res);
          this.TotalRequests = total;
          // console.log('Fetched requests:', total);
        },
        error: (err) => {
          console.log('Error fetching requests:', err);
        },
      });

    }

    private extractList<T>(res: any): { data: T[]; total: number } {
    if (!res) return { data: [], total: 0 };

    if (Array.isArray(res)) return { data: res, total: res.length };

    if (Array.isArray(res.data)) {
      return { data: res.data, total: res.totalCount ?? res.totalItems ?? res.data.length };
    }
    if (Array.isArray(res.items)) {
      return { data: res.items, total: res.totalCount ?? res.totalItems ?? res.items.length };
    }

    for (const key of Object.keys(res)) {
      const v = res[key];
      if (v && Array.isArray(v.data)) {
        return { data: v.data, total: v.totalCount ?? v.totalItems ?? v.data.length };
      }
      if (Array.isArray(v)) {
        return { data: v, total: v.length };
      }
    }

    return { data: [], total: 0 };
    }

}
