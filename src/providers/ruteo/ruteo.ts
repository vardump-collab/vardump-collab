import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginPage} from '../../pages/login/login';

/*
  Generated class for the RuteoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LoginPage },
    { path: 'second/:price', component: LoginPage },
  ];
@Injectable()
export class RuteoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RuteoProvider Provider');
  }

}
