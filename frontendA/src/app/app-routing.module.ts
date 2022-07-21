import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { FullComponent } from './layout/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children:[
      { path: '', redirectTo: '/inscription', pathMatch: 'full' },
      {
        path: 'inscription',
        loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionModule),
      }
    ]
  },
  {
    path: '',
    redirectTo: '/inscription',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/inscription'
  }
];

