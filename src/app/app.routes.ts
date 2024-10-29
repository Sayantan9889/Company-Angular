import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
    {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: '**', redirectTo: ''}
];
