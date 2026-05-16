import { Routes } from '@angular/router';

export const routes: Routes = [

{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

//   {
//     path: '**',
//     redirectTo: 'login'
//   },

  {
    path: 'login',
    loadComponent: () => 
        import('./modules/auth/pages/login/login')
            .then(m => m.Login)
        
  },

  {
    path: 'dashboard',
    loadComponent: () => 
        import('./modules/features/dashboard/layout/layout')
            .then(m => m.Layout),
    
    children: [
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        },
        {
            path: 'home',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/home/home')
                    .then(m => m.Home)
        },
        {
            path: 'blood-inventory',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/blood-inventory/blood-inventory')
                    .then(m => m.BloodInventory)
        },
        {
            path: 'requests',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/requests/requests')
                    .then(m => m.Requests)
        },
        {
            path: 'predictions',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/ai-prediction/ai-prediction')
                    .then(m => m.AiPrediction)
        },
        {
            path: 'users',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/users/users')
                    .then(m => m.Users)
        },
        {
            path: 'blood-data',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/blood-data/blood-data')
                    .then(m => m.BloodData)
        },
        {
            path: 'scanning',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/scaning/scaning')
                    .then(m => m.Scaning)
        },
        {
            path: 'scanning/qr-details',
            loadComponent: ( ) =>
                import('./modules/features/dashboard/qr-details/qr-details')
                    .then(m => m.QrDetails)
        },
    ]
  }
];
