// // src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SevaFormComponent } from './form/form.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: SevaFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reports', component: DashboardComponent },
];

// // src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LoginComponent } from './login/login.component';
// import { SevaFormComponent } from './form/form.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' }, // Root redirects to login
//   { path: 'login', component: LoginComponent }, // Login page
//   {
//     path: 'dashboard', // Dashboard with sidebar
//     component: DashboardComponent,
//     children: [
//       { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default dashboard route
//       { path: 'home', component: DashboardComponent }, // Home tab
//       { path: 'form', component: SevaFormComponent }, // Your form component
//       { path: 'overview', component: DashboardComponent }, // Overview tab
//       { path: 'orders', component: DashboardComponent }, // Orders tab
//       { path: 'products', component: DashboardComponent }, // Products tab
//       { path: 'customers', component: DashboardComponent }, // Customers tab
//       { path: 'settings', component: DashboardComponent }, // Settings tab
//     ],
//   },
// ];
