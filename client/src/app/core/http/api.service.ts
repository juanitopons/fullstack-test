import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  QueryOptions,
  EntityPostRequest,
  EntityPutRequest,
} from 'src/app/core/models/api.interface';
import {
  BaseEntityModel,
  ModelResponse,
  BooleanResponse,
} from '../models/api.interface';
import { UtilsService } from '../services/utils.service';
import { ModelMap } from '../models/app.interface';
import { ErrorResponse, RawResponse } from '../models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  private next(subject: BehaviorSubject<boolean>, loading: boolean) {
    subject.next(loading);
  }

  private formatError<T extends ErrorResponse>(
    subject: BehaviorSubject<boolean>,
    responseRef: new (...args: any[]) => T,
    err: Error,
  ) {
    this.next(subject, false);
    return new responseRef([], 0, err);
  }

  private getParams(apiQueryFilter: QueryOptions = {}) {
    let queryParams = new HttpParams();
    Object.keys(apiQueryFilter).forEach((paramKey) => {
      const paramValue = apiQueryFilter[paramKey];
      if (paramValue instanceof Array) {
        paramValue.forEach((value) => {
          queryParams = queryParams.append(`${paramKey.toString()}[]`, value);
        });
      } else if (paramValue instanceof Object) {
        if (paramKey === 'sortColumns') {
          Object.keys(paramValue).forEach((value: string) => {
            queryParams = queryParams.append(`${paramKey.toString()}[]`, value);
          });
          Object.values(paramValue).forEach((value: string) => {
            queryParams = queryParams.append(`sortDirections[]`, value);
          });
        }
      } else {
        queryParams = queryParams.set(paramKey, paramValue);
      }
    });

    return queryParams;
  }

  getAll(
    path: string,
    params: QueryOptions,
    subject: BehaviorSubject<boolean>,
    model: new () => BaseEntityModel,
  ): Observable<ModelResponse> {
    this.next(subject, true);
    return this.http
      .get(`${environment.api_url}${path}`, {
        params: this.getParams(params),
      })
      .pipe(
        map((response: RawResponse) => {
          return new ModelResponse(
            response.data,
            response.count,
            response.error,
            model,
            params,
          );
        }),
        catchError((err) => of(this.formatError(subject, ModelResponse, err))),
        finalize(() => this.next(subject, false)),
      );
  }

  put(
    path: string,
    body: EntityPutRequest,
    subject: BehaviorSubject<boolean>,
    model: new () => BaseEntityModel,
  ): Observable<ModelResponse> {
    this.next(subject, true);
    return this.http.put(`${environment.api_url}${path}`, body).pipe(
      map((response: RawResponse) => {
        return new ModelResponse(
          response.data,
          response.count,
          response.error,
          model,
        );
      }),
      catchError((err) => of(this.formatError(subject, ModelResponse, err))),
      finalize(() => this.next(subject, false)),
    );
  }

  post(
    path: string,
    body: EntityPostRequest,
    subject: BehaviorSubject<boolean>,
    model: new () => BaseEntityModel,
  ): Observable<ModelResponse> {
    this.next(subject, true);
    return this.http.post(`${environment.api_url}${path}`, body).pipe(
      map((response: RawResponse) => {
        return new ModelResponse(
          response.data,
          response.count,
          response.error,
          model,
        );
      }),
      catchError((err) => of(this.formatError(subject, ModelResponse, err))),
      finalize(() => this.next(subject, false)),
    );
  }

  delete(path, subject: BehaviorSubject<boolean>): Observable<BooleanResponse> {
    this.next(subject, true);
    return this.http.delete(`${environment.api_url}${path}`).pipe(
      map((response: BooleanResponse) => {
        return new BooleanResponse(response.data, response.error);
      }),
      catchError((err) => of(this.formatError(subject, BooleanResponse, err))),
      finalize(() => this.next(subject, false)),
    );
  }
}
