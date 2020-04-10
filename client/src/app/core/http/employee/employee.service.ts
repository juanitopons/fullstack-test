import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';
import { Employee } from 'src/app/core/models/employee.model';
import {
  ModelResponse,
  EntityPostRequest,
  BooleanResponse,
  EntityPutRequest,
} from '../../models/api.interface';
import { QueryOptions, API_URIS } from 'src/app/core/models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private loadingSubject: BehaviorSubject<boolean>;
  public loading$: Observable<boolean>;

  constructor(private apiService: ApiService) {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
  }

  public query(params: QueryOptions = {}): Observable<ModelResponse> {
    return this.apiService.getAll(
      API_URIS.EMPLOYEE,
      params,
      this.loadingSubject,
      Employee,
    );
  }

  public save(employee: Employee): Observable<ModelResponse> {
    return this.apiService.put(
      `${API_URIS.EMPLOYEE}/${employee.id}`,
      new EntityPutRequest(employee),
      this.loadingSubject,
      Employee,
    );
  }

  public create(employee: Employee): Observable<ModelResponse> {
    return this.apiService.post(
      `${API_URIS.EMPLOYEE}/`,
      new EntityPostRequest(employee),
      this.loadingSubject,
      Employee,
    );
  }

  public delete(employee: Employee): Observable<BooleanResponse> {
    return this.apiService.delete(
      `${API_URIS.EMPLOYEE}/${employee.id}`,
      this.loadingSubject,
    );
  }
}
