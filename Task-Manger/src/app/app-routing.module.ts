import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { PermissionComponent } from './permission/permission.component';
import { ReportsComponent } from './Reports/Reports.component';

const routes: Routes = [
  {path:"",redirectTo:"logIn",pathMatch:"full"},
  {path:"home",canActivate:[AuthGuard],component: HomeComponent},
  {path:"admin-dashboard",canActivate:[AuthGuard],component: AdminDashboardComponent},
  {path:"permission",canActivate:[AuthGuard],component: PermissionComponent},
  {path:"logIn",component: LogInComponent},
  {path:"Reports",canActivate:[AuthGuard],component: ReportsComponent},
  {path: '**', component: LogInComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
