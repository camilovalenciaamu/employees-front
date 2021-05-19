import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from './../../../services/employee.service';
import { EmployeeI } from './../../../models/employee.interface';
import { CountriesService } from './../../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {
  countries: any = [];
  current_positions = [];
  has_commission = false;
  employeeForm: FormGroup;
  employee_id: any;
  action: string = '';
  employee_success: string;
  hidde_button: boolean = false;
  disabled_element = false;
  constructor(
    private countriesService: CountriesService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute
  ) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      country: ['', Validators.required],
      current_position: ['', Validators.required],
      area: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      commission: ['', Validators.required],
      hiring_date: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.employee_id = +this.aRoute.snapshot.paramMap.get('id');
    if (this.aRoute.snapshot.paramMap.get('username')) {
      this.hidde_button = true;
      this.disabled_element = true;
    }
  }

  ngOnInit(): void {
    this.getCountries();
    if (this.employee_id !== undefined && this.employee_id != '0') {
      this.action = 'Editar';
      this.fillEditEmployee();
    }
    if (this.employee_id == 0) {
      this.action = 'Agregar';
    }
  }

  getCountries() {
    this.countriesService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }
  getSelectedArea(area: string) {
    this.current_positions = ['Programador', 'Diseñador'];
    if (area === 'Administrativa') {
      this.current_positions = ['Fundador y CEO', 'Recursos humanos'];
    }
  }
  hasCommission(current_position: any) {
    if (current_position === 'Fundador y CEO') {
      this.has_commission = true;
    } else {
      this.has_commission = false;
    }
  }

  addEmployee(employee: EmployeeI) {
    this.employeeService.addEmployee(employee).subscribe(
      (resp) => {
        this.snackBar.open('Empleado creado con éxito', '', {
          duration: 3000,
        });
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.resolveError(err);
      }
    );
  }
  fillEditEmployee() {
    this.employeeService.getEmployee(this.employee_id).subscribe((data) => {
      this.employeeForm.patchValue({
        name: data['name'],
        username: data['username'],
        date_of_birth: data['date_of_birth'],
        status: data['status'],
        hiring_date: data['hiring_date'],
        country: data['country'],
        area: data['area'],
        current_position: data['current_position'],
        commission: data['commission'],
      });
      this.getSelectedArea(data['area']);
      this.hasCommission(data['current_position']);
    });
  }
  editEmployee(employee: EmployeeI) {
    this.employeeService
      .updateEmployee(this.employee_id, employee)
      .subscribe((employee) => {
        this.snackBar.open('Empleado actualizado con éxito', '', {
          duration: 3000,
        });
        this.router.navigateByUrl('/');
        (err) => {
          this.resolveError(err);
        };
      });
  }

  saveEmployee(values: any) {
    let employee: EmployeeI = {
      name: values.name,
      username: values.username,
      date_of_birth: values.date_of_birth,
      status: values.status || false,
      hiring_date: values.hiring_date,
      country: values.country,
      area: values.area,
      current_position: values.current_position,
      commission: values.commission || 0,
    };

    if (this.employee_id !== undefined && this.employee_id != '0') {
      this.editEmployee(employee);
    } else {
      this.addEmployee(employee);
    }
  }

  resolveError(err: any) {
    let e = err.error.errors;
    if (e) {
      let keys = Object.keys(err.error.errors);
      keys.forEach((key) => {
        const control = this.employeeForm.controls[key];
        if (control) {
          control.setErrors({ custom: e[key][0] });
        }
      });
    }
  }

  getError(field: string) {
    if (this.employeeForm?.controls[field].hasError('custom')) {
      return this.employeeForm.controls[field].errors?.custom;
    }
    return null;
  }
}
