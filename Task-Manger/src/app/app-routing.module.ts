import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { PermissionComponent } from './permission/permission.component';
const routes: Routes = [
  {path:"",redirectTo:"logIn",pathMatch:"full"},
  {path:"home",component: HomeComponent},
  {path:"admin-dashboard",component: AdminDashboardComponent},
  {path:"permission",component: PermissionComponent},
  {path:"logIn",component: LogInComponent},
  {path: '**', component: LogInComponent}



  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
