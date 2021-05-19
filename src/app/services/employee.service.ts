import { EmployeeI } from './../models/employee.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'http://localhost:8000/api/v1';

  public getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/empleados`);
  }

  public getEmployee(id: number) {
    return this.http.get<EmployeeI>(`${this.baseUrl}/empleado/${id}`);
  }

  public deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar-empleado/${id}`);
  }

  public addEmployee(employee: EmployeeI) {
    return this.http
      .post<EmployeeI>(`${this.baseUrl}/agregar-empleado`, employee)
      .pipe(catchError(this.handleError));
  }

  public updateEmployee(id: number, employee: EmployeeI) {
    return this.http
      .put<EmployeeI>(`${this.baseUrl}/actualizar-empleado/${id}`, employee)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
