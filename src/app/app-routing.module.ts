import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDesktopComponent } from './components/user-desktop/user-desktop.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'user-desktop', component: UserDesktopComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path:'**',component:Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
