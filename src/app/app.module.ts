import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddRecordsComponent } from './add-records/add-records.component';
import { ReadRecordsComponent } from './read-records/read-records.component';
import { Routes, RouterModule } from '@angular/router';
import { CrudService } from './crud.service';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/employeesList', pathMatch: 'full' },
  {
    path: 'employeesList', component: ReadRecordsComponent,
    children: [
      { path: 'add', component: AddRecordsComponent },
      { path: 'edit/:id', component: AddRecordsComponent }]
  },
  { path: '**', component: ReadRecordsComponent }]

@NgModule({
  declarations: [
    AppComponent,
    AddRecordsComponent,
    ReadRecordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
