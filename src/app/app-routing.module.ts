import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDesktopComponent } from './components/user-desktop/user-desktop.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { CardsComponent } from './components/cards/cards.component';
import { DepositsComponent } from './components/deposits/deposits.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { UserRegisterInfoComponent } from './components/user-register-info/user-register-info.component';
import { UserPocketComponent } from './components/user-pocket/user-pocket.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'user-desktop', component: UserDesktopComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'user-info', component: UserRegisterInfoComponent},
  {path: 'cards', component: CardsComponent},
  {path: 'deposits', component: DepositsComponent},
  {path: 'addCard', component: AddCardComponent},
  {path: 'user-pocket',component:UserPocketComponent},
  { path: 'ingreso', component: LoginComponent },
  {path:'**',component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
