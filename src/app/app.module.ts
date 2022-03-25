import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { UserDesktopComponent } from './components/user-desktop/user-desktop.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserRegisterInfoComponent } from './components/user-register-info/user-register-info.component';
import { UserPocketComponent } from './components/user-pocket/user-pocket.component';
import { LoginComponent } from './components/login/login.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { HistoryComponent } from './components/history/history.component';
import { DepositsComponent } from './components/deposits/deposits.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http'; // add this line

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    UserDesktopComponent,
    UserProfileComponent,
    Page404Component, 
    HomeComponent, 
    AddCardComponent, 
    NavbarComponent, 
    UserRegisterInfoComponent, 
    UserPocketComponent, 
    LoginComponent, 
    TransfersComponent, 
    HistoryComponent,
    DepositsComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
