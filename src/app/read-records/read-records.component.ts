import { AfterViewInit, Component, OnInit, Renderer, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { CrudService } from '../crud.service';
import { Employee } from '../employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-read-records',
  templateUrl: './read-records.component.html',
  styleUrls: ['./read-records.component.css'],
})

export class ReadRecordsComponent implements AfterViewInit, OnInit {
  @Input() data:object;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  employees: Employee[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<boolean>();
  isAddClicked: boolean = false;
  showPopup: boolean = false;
  constructor(private renderer: Renderer, private crudService: CrudService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.crudService.employeesUpdated.subscribe(() => { //this service is emitted whenever data is added or updated
      this.crudService.getEmployees().subscribe((resp: any[]) => {
        this.rerender();
        this.isAddClicked = false;
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 3000);
      });
    })

    this.dtOptions = {
      ajax: this.crudService.data["baseApiUrl"],
      columns : this.crudService.data["columns"]
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute('delete')) {
        this.deleteEmp(event.target.parentElement.parentNode.firstChild.innerHTML);
      }
      if (event.target.hasAttribute('edit')) {
        this.router.navigate(['edit', event.target.parentElement.parentNode.firstChild.innerHTML], { relativeTo: this.route });
      }
    });
  }
  public deleteEmp(empId: number) {
    this.crudService.deleteEmployee(empId).subscribe((ret) => {
    })
  }
  onAddClicked() {
    this.isAddClicked = true;
    this.router.navigate(['add'], { relativeTo: this.route });
  }
  public rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy(); // Destroy the table first
      this.dtTrigger.next(); // Call the dtTrigger to rerender again
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
