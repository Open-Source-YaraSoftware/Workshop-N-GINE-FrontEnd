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
        path: 'tasks',
        title: 'tasks',
        loadComponent: () => import('./service/pages/tasks/tasks.component').then(m => m.TasksComponent),
      },
      {
        path: 'tasks/:id',
        title: 'task',
        loadComponent: () => import('./service/components/task-header/task-header.component').then(m => m.TaskHeaderComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'information',
          },
          {
            path: 'information',
            title: 'information',
            loadComponent: () => import('./service/pages/task-information/task-information.component').then(m => m.TaskInformationComponent),
          },
          {
            path: 'diagnostic-preparation',
            title: 'diagnostic-preparation',
            loadComponent: () => import('./service/pages/task-diagnostic-preparation/task-diagnostic-preparation.component').then(m => m.TaskDiagnosticPreparationComponent),
          },
          {
            path: 'execution/:taskId',
            title: 'execution',
            loadComponent: () => import('./service/components/task-execution-header/task-execution-header.component').then(m => m.TaskExecutionHeaderComponent),
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'requests',
              },
              {
                path: 'requests',
                title: 'task-requests',
                loadComponent: () => import('./service/pages/task-requests/task-requests.component').then(m => m.TaskRequestsComponent),
              },
              {
                path: 'tracking',
                title: 'task-tracking',
                loadComponent: () => import('./service/pages/task-tracking/task-tracking.component').then(m => m.TaskTrackingComponent),
              }
            ]
          },
          {
            path: 'monitoring',
            title: 'monitoring',
            loadComponent: () => import('./service/pages/task-monitoring/task-monitoring.component').then(m => m.TaskMonitoringComponent),
          }
        ]
      },
      {
        path: 'vehicles/client/:id',
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
