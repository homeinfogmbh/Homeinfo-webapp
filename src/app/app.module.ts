import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './modules/menu/menu.component';
import { HeaderComponent } from './modules/header/header.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './modules/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { Menu2Component } from './modules/menu2/menu2.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShowComponent } from './show/show.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NewsChartComponent } from './news-chart/news-chart.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import { AllowAccessComponent } from './allow-acces/allow-access.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    Menu2Component,
    AuthComponent,
    ShowComponent,
    NewsChartComponent,
    AllowAccessComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
