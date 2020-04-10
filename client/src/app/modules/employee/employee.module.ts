import { NgModule } from '@angular/core';
import { EmployeeListPage } from 'src/app/modules/employee/pages/list/list.page';
import { EmployeeNewPage } from 'src/app/modules/employee/pages/new/new.page';
import { EmployeeEditPage } from 'src/app/modules/employee/pages/edit/edit.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee.routing';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    EmployeeListPage,
    EmployeeNewPage,
    EmployeeEditPage,
    ModalDeleteComponent,
  ],
  entryComponents: [EmployeeListPage, EmployeeNewPage, EmployeeEditPage],
  exports: [EmployeeRoutingModule],
})
export class EmployeeModule {}
