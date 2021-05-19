import { ConfirmationMessageComponent } from './../../shared/confirmation-message/confirmation-message.component';
import { EmployeeI } from './../../../models/employee.interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  @Input() employee: any = [];
  list_employees: EmployeeI[];
  displayedColumns: string[] = ['name', 'age', 'hiring_date', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.list_employees = employees;
      this.dataSource = new MatTableDataSource(this.list_employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  calculateAge(date_of_birth): number {
    var now = new Date();
    var current_year = now.getFullYear();
    return current_year - date_of_birth.split('-')[0];
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de eliminar el empleado?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Sí') {
        this.employeeService.deleteEmployee(id).subscribe((employee) => {
          this.getEmployees();
        });

        this.snackBar.open('Empleado eliminado con éxito', '', {
          duration: 3000,
        });
      }
    });
  }
}
