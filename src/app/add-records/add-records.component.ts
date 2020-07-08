import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../crud.service';
import { Employee } from '../employee.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-records',
  templateUrl: './add-records.component.html',
  styleUrls: ['./add-records.component.css']
})

export class AddRecordsComponent implements OnInit {
  @ViewChild('postForm', { static: false }) signupForm: NgForm;
  id: number;
  defaultGender = 'male';
  genders = ['male', 'female'];
  btnValue: string = 'Add Employee';
  constructor(private crudService: CrudService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    if (this.route.routeConfig.path == "add") {
      this.btnValue = 'Add Employee';
    }
    else {
      this.route.params.subscribe((params: Params) => {
        this.crudService.getEmployee(+params['id']).subscribe((resp: Employee) => {
          this.id = resp.id;
          this.signupForm.setValue({
            empName: resp.empName,
            empGender: resp.empGender,
            empAge: resp.empAge,
            empSalary: resp.empSalary
          })
        })
        this.btnValue = 'Update Employee';
      })
    }
  }
  public addUpdateEmployee() {
    if (this.route.routeConfig.path == "add") {
      this.crudService.createEmployee(this.signupForm.value).subscribe((ret) => {
      });
    }
    else {
      this.signupForm.value.id = this.id;
      this.crudService.updateEmployee(this.signupForm.value).subscribe((ret) => {
      });
    }
    this.signupForm.reset();
    this.router.navigate(['/employeesList']);
  }
}
