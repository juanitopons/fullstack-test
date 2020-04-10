import { Component } from '@angular/core';
import { Department } from '../../../../core/models/department.model';
import { DepartmentsDataSource } from './list-datasource';
import { QueryOptions } from 'src/app/core/models/api.interface';
import { DepartmentService } from 'src/app/core/http/department/department.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ItemAction } from '../../../../shared/components/list/list.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './list.page.pug',
  styleUrls: ['./list.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class DepartmentListPage {
  departmentDataSource: DepartmentsDataSource;
  departmentListFilter: QueryOptions = {
    searchColumns: ['id', 'name'],
    sortColumns: {},
    itemsPerPage: 4,
    page: 0,
  };
  departments: Department[];
  departmentsLength: number;
  listItemActions: ItemAction[] = [
    {
      name: 'Delete',
      action: this.delete,
      icon: 'delete',
    },
    {
      name: 'Edit',
      action: this.edit,
      icon: 'edit',
    },
  ];
  mainButton: ItemAction = {
    name: 'Add Department',
    icon: 'add',
    action: this.add,
  };

  cols = [
    { key: 'id', value: 'Id', flex: '40%' },
    { key: 'name', value: 'Name', flex: '60%' },
  ];

  displayedCols = ['id', 'name', 'actions'];

  constructor(
    private utilsService: UtilsService,
    private departmentService: DepartmentService,
    private departmenService: DepartmentService,
    private toastService: ToastService,
  ) {
    this.departmentDataSource = new DepartmentsDataSource(
      this.departmenService,
    );
  }

  onListDataLoaded(status: boolean) {
    if (status) {
      this.toastService.info('Data loaded correctly!');
    } else {
      this.toastService.error(
        'Ups...something went wrong when loading the data!',
      );
    }
  }

  add(event) {
    // TODO: Add event implementation for adding new department
  }

  edit(event) {
    // TODO: Add event implementation for department edit
  }

  delete(event) {
    // TODO: Add event implementation for delete department event
  }
}
