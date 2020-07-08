import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  employeesUpdated = new EventEmitter();
  data: object = {
    baseApiUrl: 'https://5f01c1cf9e41230016d427f8.mockapi.io/api/employees/employeesData', // same as get URL
    edit: '/:id',
    add: '', // an object is passed
    delete: '/:id',
    columns: [{ title: 'Id', data: 'id' },
    { title: 'Employee Name', data: 'empName' },
    { title: 'Age', data: 'empAge' },
    { title: 'Salary', data: 'empSalary', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
    { title: 'Gender', data: 'empGender' },
    {
      title: 'Action',
      data: 'id',
      render: function (data: any, type: any, full: any) {
        return `<button class="btn btn-danger" delete (click)="deleteEmp(data)">Delete </button>
          <a class="btn btn-warning" role="button" edit [routerLink]="['edit', emp.id]">Edit</a>`;
      }
    }],
    events: {
      //this emitter is called on all of the data change APIs to notify the calling controller about changes
      //i.e add, edit, delete
      changeUpdated: () => this.employeesUpdated.emit(),
    }
  }

  constructor(private httpClient: HttpClient) { }

  public getEmployees() {
    return this.httpClient.get(this.data["baseApiUrl"]);
  }

  public getEmployee(empId) {
    return this.httpClient.get(`${this.data["baseApiUrl"]}/${empId}`);
  }
  public createEmployee(emp: Employee) {
    return this.httpClient.post(this.data["baseApiUrl"], emp).pipe(
      tap(data => {
        console.log(`created employee w/ id=${data['id']}`);
        this.data["events"].changeUpdated(); //emit event to notify employee list changes to main controller
      }),
      catchError(this.handleError)
    );
  }

  public deleteEmployee(empId) {
    return this.httpClient.delete(`${this.data["baseApiUrl"]}/${empId}`).pipe(
      tap(data => {
        console.log(`deleted employee w/ id=${data['id']}`);
        this.data["events"].changeUpdated(); //emit event to notify employee list changes to main controller
      }),
      catchError(this.handleError)
    );
  }
  public updateEmployee(emp: Employee) {
    return this.httpClient.put(`${this.data["baseApiUrl"]}/${emp.id}`, emp).pipe(tap(data => {
      console.log(`updated employee w/ id=${data['id']}`);
      this.data["events"].changeUpdated(); //emit event to notify employee list changes to main controller
    }));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
