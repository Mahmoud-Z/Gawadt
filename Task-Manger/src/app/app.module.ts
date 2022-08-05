import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './log-in/log-in.component';
import { PermissionComponent } from './permission/permission.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminDashboardComponent,
    LogInComponent,
    PermissionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
