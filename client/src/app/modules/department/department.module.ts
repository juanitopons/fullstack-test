import { NgModule } from '@angular/core';
import { DepartmentRoutingModule } from './department.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentListPage } from '../department/pages/list/list.page';
import { DepartmentNewPage } from '../department/pages/new/new.page';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    DepartmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule
  ],
  declarations: [DepartmentListPage, DepartmentNewPage],
  entryComponents: [DepartmentListPage, DepartmentNewPage],
  exports: [DepartmentRoutingModule]
})
export class DepartmentModule { }
