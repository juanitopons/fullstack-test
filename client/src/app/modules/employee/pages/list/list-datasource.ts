import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DepartmentService } from 'src/app/core/http/department/department.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/http/employee/employee.service';
import { QueryOptions } from 'src/app/core/models/api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { DataSourceSubjData } from 'src/app/core/models/app.interface';
import { ListDataSource } from '~shared/components/list/list.component';
import { Department } from 'src/app/core/models/department.model';

export class EmployeesDataSource extends DataSource<Employee>
  implements ListDataSource<Employee> {
  private employeesDataSourceSubject = new BehaviorSubject<Employee[]>([]);
  private dataSourceSubjData = new DataSourceSubjData(false);
  private dataSourceSubject = new BehaviorSubject<DataSourceSubjData>(
    this.dataSourceSubjData,
  );
  public dataSourceSubjData$ = this.dataSourceSubject.asObservable();

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
  ) {
    super();
  }

  public loadData(options: QueryOptions) {
    this.dataSourceSubject.next(this.dataSourceSubjData.reset());

    forkJoin({
      employees: this.employeeService.query(options).pipe(map((res) => res)),
      departments: this.departmentService.query({ mapping: 'id' }),
    }).subscribe((results) => {
      this.dataSourceSubjData.setErrors(results.departments, results.employees);
      if (!this.dataSourceSubjData.hasErrors()) {
        results.employees.joinOneToOneRelation(
          results.departments.data,
          'departmentId',
          'department',
        );
        this.employeesDataSourceSubject.next(
          results.employees.data[0] as Employee[],
        );
      }

      this.dataSourceSubject.next(
        this.dataSourceSubjData.set(false, results.employees.count),
      );
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
    return this.employeesDataSourceSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeesDataSourceSubject.complete();
    this.dataSourceSubject.complete();
  }
}
