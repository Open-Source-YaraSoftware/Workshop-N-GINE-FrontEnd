import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'home',
    loadComponent: () => import('./shared/components/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'personnel',
        title: 'personnel',
        loadComponent: () => import('./service/pages/personnel/personnel.component').then(m => m.PersonnelComponent),
      },
      {
        path: 'clients',
        title: 'clients',
        loadComponent: () => import('./crm/pages/clients/clients.component').then(m => m.ClientsComponent),
      },
      {
        path: 'clients/:id',
        title: 'client',
        loadComponent: () => import('./crm/pages/client-detail/client-detail.component').then(m => m.ClientDetailComponent),
      },
      {
        path: 'interventions',
        title: 'interventions',
        loadComponent: () => import('./service/pages/interventions/interventions.component').then(m => m.InterventionsComponent),
      },
      {
        path: 'interventions/:id',
        title: 'intervention',
        loadComponent: () => import('./service/pages/intervention-detail/intervention-detail.component').then(m => m.InterventionDetailComponent),
      },
      {
        path: 'inventory',
        title: 'inventory',
        loadComponent: () => import('./service/components/inventory-header/inventory-header.component').then(m => m.InventoryHeaderComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'items',
          },
          {
            path: 'items',
            title: 'items',
            loadComponent: () => import('./service/pages/items/items.component').then(m => m.ItemsComponent),
          },
          {
            path: 'requests',
            title: 'requests',
            loadComponent: () => import('./service/pages/requests/requests.component').then(m => m.RequestsComponent),
          }
        ]
      },
      {
        path: 'metrics',
        title: 'metrics',
        loadComponent: () => import('./analytics/components/analytics-header/analytics-header.component').then(m => m.AnalyticsHeaderComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'interventions-by-date',
          },
          {
            path: 'interventions-by-date',
            title: 'interventions-by-date',
            loadComponent: () => import('./analytics/pages/interventions-by-date/interventions-by-date.component').then(m => m.InterventionsByDateComponent),
          }
        ]
      },
      {
        path: 'notifications',
        title: 'notifications',
        loadComponent: () => import('./communication/pages/notifications/notifications.component').then(m => m.NotificationsComponent),
      },
      {
        path: 'activities',
        title: 'activities',
        loadComponent: () => import('./service/components/activities-header/activities-header.component').then(m => m.ActivitiesHeaderComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'assistant',
          },
          {
            path: 'assistant',
            title: 'assistant',
            loadComponent: () => import('./service/pages/tasks/tasks.component').then(m => m.TasksComponent),
          },
          {
            path: 'leader',
            title: 'leader',
            loadComponent: () => import('./service/pages/interventions-leader/interventions-leader.component').then(m => m.InterventionsLeaderComponent),
          }
        ]
      },
      {
        path: 'activities/:id',
        title: 'activity',
        loadComponent: () => import('./service/components/activity-header/activity-header.component').then(m => m.ActivityHeaderComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'information',
          },
          {
            path: 'information',
            title: 'information',
            loadComponent: () => import('./service/pages/activity-information/activity-information.component').then(m => m.ActivityInformationComponent),
          },
          {
            path: 'diagnostic-preparation',
            title: 'diagnostic-preparation',
            loadComponent: () => import('./service/pages/activity-diagnostic-preparation/activity-diagnostic-preparation.component').then(m => m.ActivityDiagnosticPreparationComponent),
          },
          {
            path: 'execution/:taskId',
            title: 'execution',
            loadComponent: () => import('./service/components/activity-execution-header/activity-execution-header.component').then(m => m.ActivityExecutionHeaderComponent),
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'requests',
              },
              {
                path: 'requests',
                title: 'activity-requests',
                loadComponent: () => import('./service/pages/activity-requests/activity-requests.component').then(m => m.ActivityRequestsComponent),
              },
              {
                path: 'tracking',
                title: 'activity-tracking',
                loadComponent: () => import('./service/pages/activity-tracking/activity-tracking.component').then(m => m.ActivityTrackingComponent),
              }
            ]
          },
          {
            path: 'monitoring',
            title: 'monitoring',
            loadComponent: () => import('./service/pages/activity-monitoring/activity-monitoring.component').then(m => m.ActivityMonitoringComponent),
          }
        ]
      },
      {
        path: 'vehicles',
        title: 'vehicles',
        loadComponent: () => import('./crm/pages/vehicles/vehicles.component').then(m => m.VehiclesComponent),
      },
      {
        path: 'vehicles/:id',
        title: 'vehicle',
        loadComponent: () => import('./crm/pages/vehicle-detail/vehicle-detail.component').then(m => m.VehicleDetailComponent),
      },
      {
        path: 'profile/:id',
        title: 'profile',
        loadComponent: () => import('./iam/pages/profile/profile.component').then(m => m.ProfileComponent),
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
