import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  // standart route redirecting to homepage
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // standart page
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
