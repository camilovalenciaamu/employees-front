import { ListEmployeeComponent } from './components/employee/list-employees/list-employees.component';
import { AddEditEmployeeComponent } from './components/employee/add-edit-employee/add-edit-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListEmployeeComponent },
  { path: 'agregar-empleado', component: AddEditEmployeeComponent },
  { path: 'editar-empleado/:id', component: AddEditEmployeeComponent },
  {
    path: 'detalle-empleado/:id/:username',
    component: AddEditEmployeeComponent,
  },
  { path: '**', component: ListEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
