import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDesktopComponent } from './components/user-desktop/user-desktop.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { CardsComponent } from './components/cards/cards.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { UserRegisterInfoComponent } from './components/user-register-info/user-register-info.component';
import { UserPocketComponent } from './components/user-pocket/user-pocket.component';
import { LoginComponent } from './components/login/login.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { HistoryComponent } from './components/history/history.component';
import { DepositsComponent } from './components/deposits/deposits.component';
import { RegisterComponent } from './components/register/register.component';
import { LegalComponent } from './components/legal/legal.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'miCuenta', component: UserPocketComponent },
  { path: 'miPerfil', component: UserProfileComponent },
  { path: 'informacionUsuario', component: UserRegisterInfoComponent },
  { path: 'misTarjetas', component: CardsComponent },
  { path: 'agregarTarjeta', component: AddCardComponent },
  { path: 'miBolsillo', component: UserPocketComponent },
  { path: 'transacciones', component: TransfersComponent },
  { path: 'historial', component: HistoryComponent },
  { path: 'ingresar', component: LoginComponent },
  { path: 'depositos', component: DepositsComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'registro', component: RegisterComponent },
  {path: 'paymoon', component: AboutUsComponent },
  {path: 'updateInfo', component: UpdateInfoComponent},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
