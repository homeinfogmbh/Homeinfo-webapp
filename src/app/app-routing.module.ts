import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
//import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {ShowComponent} from './show/show.component';
import {NewsComponent} from './news/news.component';
import {AuthGuard} from './auth/auth.guard';
import {AllowAccessComponent} from './allow-acces/allow-access.component';

const routes: Routes = [
  // standart route redirecting to homepage
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: AuthComponent},
  {path: 'grantAccess', component: AllowAccessComponent},
  {path: 'kunde', component: ShowComponent, children:[
      {
        path: 'news', component: NewsComponent, canActivate:[AuthGuard],
      },
      {
        path: 'home', component:HomeComponent, canActivate:[AuthGuard]
      },
    ],
    canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
