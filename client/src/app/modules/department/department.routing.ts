import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListPage } from 'src/app/modules/department/pages/list/list.page';
import { DepartmentNewPage } from 'src/app/modules/department/pages/new/new.page';

export const DEPARTMENT_ROUTES: Routes = [
  {
    path: '',
    component: DepartmentListPage
  },
  {
    path: 'new',
    component: DepartmentNewPage,
    data: {
      breadcrumb: 'new',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(DEPARTMENT_ROUTES)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule {}
