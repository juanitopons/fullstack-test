import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '~core/not-found/not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: 'employees',
    data: {
      breadcrumb: 'employees'
    },
    loadChildren: () =>
      import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'departments',
    data: {
      breadcrumb: 'departments'
    },
    loadChildren: () =>
      import('./modules/department/department.module').then(m => m.DepartmentModule)
  },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  {
    path: '**',
    data: {
      breadcrumb: 'not-found'
    },
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
