import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeeComponent } from './components/employee/employee.component';
import { ListEmployeeComponent } from './components/employee/list-employees/list-employees.component';
import { AddEditEmployeeComponent } from './components/employee/add-edit-employee/add-edit-employee.component';
import { ConfirmationMessageComponent } from './components/shared/confirmation-message/confirmation-message.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ListEmployeeComponent,
    AddEditEmployeeComponent,
    ConfirmationMessageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
