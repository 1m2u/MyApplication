import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SevaFormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: SevaFormComponent },
  // Add more routes as needed
];