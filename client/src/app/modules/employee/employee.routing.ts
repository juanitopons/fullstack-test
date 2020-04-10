import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListPage } from 'src/app/modules/employee/pages/list/list.page';
import { EmployeeEditPage } from 'src/app/modules/employee/pages/edit/edit.page';
import { EmployeeNewPage } from 'src/app/modules/employee/pages/new/new.page';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeListPage
  },
  {
    path: 'edit',
    component: EmployeeEditPage,
    data: {
      breadcrumb: 'edit',
    }
  },
  {
    path: 'new',
    component: EmployeeNewPage,
    data: {
      breadcrumb: 'new',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(EMPLOYEE_ROUTES)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
