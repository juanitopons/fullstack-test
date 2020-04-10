import { Component } from '@angular/core';
import { Employee } from '../../../../core/models/employee.model';
import { EmployeesDataSource } from './list-datasource';
import { QueryOptions } from 'src/app/core/models/api.interface';
import { EmployeeService } from 'src/app/core/http/employee/employee.service';
import { DepartmentService } from 'src/app/core/http/department/department.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ItemAction } from '../../../../shared/components/list/list.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.page.pug',
  styleUrls: ['./list.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class EmployeeListPage {
  employeeDataSource: EmployeesDataSource;
  employeeListFilter: QueryOptions = {
    searchColumns: ['id', 'name', 'lastname'],
    sortColumns: {},
    itemsPerPage: 5,
    page: 0,
  };
  employees: Employee[];
  employeesLength: number;
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
    name: 'Add Employee',
    icon: 'add',
    action: this.add,
  };

  cols = [
    { key: 'id', value: 'Id', flex: '9%' },
    { key: 'name', value: 'Name', flex: '17%' },
    { key: 'lastname', value: 'Lastname', flex: '17%' },
    { key: 'department.name', value: 'Department', flex: '22%' },
    { key: 'age', value: 'Age', flex: '10%' },
    { key: 'created', value: 'Created', flex: '25%' },
  ];

  displayedCols = [
    'id',
    'name',
    'lastname',
    'department.name',
    'age',
    'created',
    'actions',
  ];

  constructor(
    private employeeService: EmployeeService,
    private departmenService: DepartmentService,
    private toastService: ToastService,
  ) {
    this.employeeDataSource = new EmployeesDataSource(
      this.departmenService,
      this.employeeService,
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
    // TODO: Add event implementation for adding new employee
  }

  edit(event) {
    // TODO: Add event implementation for employee edit
  }

  delete(event) {
    // TODO: Add event implementation for delete employee event
  }
}
