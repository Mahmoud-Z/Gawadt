import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component: HomeComponent},
  {path:"admin-dashboard",component: AdminDashboardComponent}

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
