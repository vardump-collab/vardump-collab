import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginPage} from '../pages/login/login';

import { Injectable } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LoginPage },
  { path: 'second/:price', component: LoginPage },
];

  @Injectable()
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }