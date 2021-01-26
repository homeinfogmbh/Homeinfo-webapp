import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './modules/menu/menu.component';
import { HeaderComponent } from './modules/header/header.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { FooterComponent } from './modules/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { Menu2Component } from './modules/menu2/menu2.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    Menu2Component
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
