import { Injectable } from '@angular/core';
import {
  BaseEntityModel,
  BaseIdModel,
  ModelResponse,
} from '../models/api.interface';
import { BehaviorSubject } from 'rxjs';
import { ModelMap } from '~core/models/app.interface';
import { ModelResponseData } from '../models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  public loading(status: boolean) {
    this.loadingSubject.next(status);
  }
}
