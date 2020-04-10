import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/http/department/department.service';
import { QueryOptions } from 'src/app/core/models/api.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { DataSourceSubjData } from 'src/app/core/models/app.interface';
import { ListDataSource } from '~shared/components/list/list.component';
import { BaseIdModel } from '../../../../core/models/api.interface';

export class DepartmentsDataSource extends DataSource<Department>
  implements ListDataSource<Department> {
  private departmentsDataSourceSubject = new BehaviorSubject<Department[]>([]);
  private dataSourceSubjData = new DataSourceSubjData(false);
  private dataSourceSubject = new BehaviorSubject<DataSourceSubjData>(
    this.dataSourceSubjData,
  );
  public dataSourceSubjData$ = this.dataSourceSubject.asObservable();

  constructor(private departmentService: DepartmentService) {
    super();
  }

  public loadData(options: QueryOptions) {
    this.dataSourceSubject.next(this.dataSourceSubjData.reset());
    this.departmentService
      .query(options)
      .pipe(map((res) => res))
      .subscribe((results) => {
        this.dataSourceSubjData.setErrors(results);
        if (!this.dataSourceSubjData.hasErrors()) {
          this.departmentsDataSourceSubject.next(
            results.data[0] as Department[],
          );
        }

        this.dataSourceSubject.next(
          this.dataSourceSubjData.set(false, results.count),
        );
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Department[]> {
    return this.departmentsDataSourceSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.departmentsDataSourceSubject.complete();
    this.dataSourceSubject.complete();
  }
}
