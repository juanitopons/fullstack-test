import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';
import { Department } from 'src/app/core/models/department.model';
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
export class DepartmentService {
  private loadingSubject: BehaviorSubject<boolean>;
  public loading$: Observable<boolean>;

  constructor(private apiService: ApiService) {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
  }

  public query(params: QueryOptions = {}): Observable<ModelResponse> {
    return this.apiService.getAll(
      API_URIS.DEPARTMENT,
      params,
      this.loadingSubject,
      Department,
    );
  }

  public save(department: Department): Observable<ModelResponse> {
    return this.apiService.put(
      `${API_URIS.EMPLOYEE}/${department.id}`,
      new EntityPutRequest(department),
      this.loadingSubject,
      Department,
    );
  }

  public create(department: Department): Observable<ModelResponse> {
    return this.apiService.post(
      `${API_URIS.EMPLOYEE}/`,
      new EntityPostRequest(department),
      this.loadingSubject,
      Department,
    );
  }

  public delete(department: Department): Observable<BooleanResponse> {
    return this.apiService.delete(
      `${API_URIS.DEPARTMENT}/${department.id}`,
      this.loadingSubject,
    );
  }
}
