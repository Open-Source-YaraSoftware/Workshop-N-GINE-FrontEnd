import { Routes } from '@angular/router';
import {authenticationGuard} from "./iam/services/authentication.guard";

export const routes: Routes = [
  {
    path: '',
    title: 'home',
    loadComponent: () => import('./shared/components/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'personnel',
        title: 'personnel',
        loadComponent: () => import('./service/pages/personnel/personnel.component').then(m => m.PersonnelComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'clients',
        title: 'clients',
        loadComponent: () => import('./crm/pages/clients/clients.component').then(m => m.ClientsComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'clients/:id',
        title: 'client',
        loadComponent: () => import('./crm/pages/client-detail/client-detail.component').then(m => m.ClientDetailComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'interventions',
        title: 'interventions',
        loadComponent: () => import('./service/pages/interventions/interventions.component').then(m => m.InterventionsComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'interventions/:id',
        title: 'intervention',
        loadComponent: () => import('./service/pages/intervention-detail/intervention-detail.component').then(m => m.InterventionDetailComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'inventory',
        title: 'inventory',
        loadComponent: () => import('./inventory/components/inventory-header/inventory-header.component').then(m => m.InventoryHeaderComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'items',
          },
          {
            path: 'items',
            title: 'items',
            loadComponent: () => import('./inventory/pages/items/items.component').then(m => m.ItemsComponent),
            canActivate: [authenticationGuard]
          },
          {
            path: 'requests',
            title: 'requests',
            loadComponent: () => import('./inventory/pages/requests/requests.component').then(m => m.RequestsComponent),
            canActivate: [authenticationGuard]
          }
        ]
      },
      {
        path: 'metrics',
        title: 'metrics',
        loadComponent: () => import('./analytics/components/analytics-header/analytics-header.component').then(m => m.AnalyticsHeaderComponent),
        canActivate: [authenticationGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'interventions-by-date'
          },
          {
            path: 'interventions-by-date',
            title: 'interventions-by-date',
            loadComponent: () => import('./analytics/pages/interventions-by-date/interventions-by-date.component').then(m => m.InterventionsByDateComponent),
            canActivate: [authenticationGuard]
          }
        ]
      },
      {
        path: 'notifications',
        title: 'notifications',
        loadComponent: () => import('./communication/pages/notifications/notifications.component').then(m => m.NotificationsComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'activities',
        title: 'activities',
        loadComponent: () => import('./service/components/activities-header/activities-header.component').then(m => m.ActivitiesHeaderComponent),
        canActivate: [authenticationGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'assistant'
          },
          {
            path: 'assistant',
            title: 'assistant',
            loadComponent: () => import('./service/pages/interventions-assistant/interventions-assistant.component').then(m => m.InterventionsAssistantComponent),
            canActivate: [authenticationGuard]
          },
          {
            path: 'leader',
            title: 'leader',
            loadComponent: () => import('./service/pages/interventions-leader/interventions-leader.component').then(m => m.InterventionsLeaderComponent),
            canActivate: [authenticationGuard]
          }
        ]
      },
      {
        path: 'activities/:id',
        title: 'activity',
        loadComponent: () => import('./service/pages/activity/activity.component').then(m => m.ActivityComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'vehicles',
        title: 'vehicles',
        loadComponent: () => import('./crm/pages/vehicles/vehicles.component').then(m => m.VehiclesComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'vehicles/:id',
        title: 'vehicle',
        loadComponent: () => import('./crm/pages/vehicle-detail/vehicle-detail.component').then(m => m.VehicleDetailComponent),
        canActivate: [authenticationGuard]
      },
      {
        path: 'profile/:id',
        title: 'profile',
        loadComponent: () => import('./iam/pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authenticationGuard]
      }
    ]
  },
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('./public/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    title: 'register',
    loadComponent: () => import('./public/pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
  }
];
