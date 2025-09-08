import { Routes } from '@angular/router';
import { LoginComponent } from './pawfet/login-component/login-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/pawfetModule/login',
        pathMatch: 'full'
      },
    {
        path: 'pawfetModule',
        loadChildren: () => import('./pawfet/pawfet-module').then(m => m.PawfetModule)
      }
];
