import { Routes } from '@angular/router';
import { authGuard } from './Core/Guard/auth-guard';
import { Login } from './modules/auth/pages/login/login';

export const routes: Routes = [


    { path: 'login', component: Login, title: 'Login' },

    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/features/dashboard/layout/layout').then(
        (m) => m.Layout
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./modules/features/dashboard/home/home').then((m) => m.Home),
      },
      {
        path: 'blood-inventory',
        loadComponent: () =>
          import(
            './modules/features/dashboard/blood-inventory/blood-inventory'
          ).then((m) => m.BloodInventory),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import(
            './modules/features/dashboard/requests/requests'
          ).then((m) => m.Requests),
      },
      {
        path: 'predictions',
        loadComponent: () =>
          import(
            './modules/features/dashboard/ai-prediction/ai-prediction'
          ).then((m) => m.AiPrediction),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./modules/features/dashboard/users/users').then(
            (m) => m.Users
          ),
      },
      {
        path: 'blood-data',
        loadComponent: () =>
          import(
            './modules/features/dashboard/blood-data/blood-data'
          ).then((m) => m.BloodData),
      },
      {
        path: 'scanning',
        loadComponent: () =>
          import(
            './modules/features/dashboard/scaning/scaning'
          ).then((m) => m.Scaning),
      },
      {
        path: 'hospitals',
        loadComponent: () =>
          import('./modules/features/dashboard/hospitals/hospitals').then(
            (m) => m.Hospitals
          ),
      },
      {
        path: 'hospital-admins',
        loadComponent: () =>
          import('./modules/features/dashboard/hospital-admins/hospital-admins').then(
            (m) => m.HospitalAdmins
          ),
      },
      {
        path: 'rewards',
        loadComponent: () =>
          import('./modules/features/dashboard/rewards/rewards').then(
            (m) => m.Rewards
          ),
      },
      {
        path: 'scanning/qr-details',
        loadComponent: () =>
          import(
            './modules/features/dashboard/qr-details/qr-details'
          ).then((m) => m.QrDetails),
      },
    ],
  },

  // Catch-all fallback
  {
    path: '**',
    redirectTo: 'login',
  },
];
