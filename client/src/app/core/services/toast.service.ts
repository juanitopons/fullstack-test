import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  IToast,
  ToastDefaults,
  ToastOptions,
  ToastStyles,
} from '../models/toast.interface';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private subject = new Subject<IToast>();

  constructor() {}

  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getToast(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, options?: ToastOptions): void {
    this.toast(message, ToastStyles.SUCCESS, options);
  }

  error(message: string, options?: ToastOptions): void {
    this.toast(message, ToastStyles.ERROR, options);
  }

  info(message: string, options?: ToastOptions): void {
    this.toast(message, ToastStyles.INFO, options);
  }

  warn(message: string, options?: ToastOptions): void {
    this.toast(message, ToastStyles.WARNING, options);
  }

  toast(message: string, style: ToastStyles, options?: ToastOptions): void {
    options = options || {};
    options.closeString = options.closeString || ToastDefaults.CLOSE_STR;
    options.duration = options.duration || ToastDefaults.DURATION;
    this.subject.next({
      id: this.generateGuid(),
      message,
      style,
      options,
    } as IToast);
  }

  clear() {
    this.subject.next();
  }
}
