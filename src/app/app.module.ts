import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { UserDesktopComponent } from './components/user-desktop/user-desktop.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    UserDesktopComponent,
    UserProfileComponent,    
    UserNavbarComponent, Page404Component, HomeComponent, AddCardComponent, NavbarComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
