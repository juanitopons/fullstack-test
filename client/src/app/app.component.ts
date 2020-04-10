import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ToastService } from './core/services/toast.service';
import { IToast } from './core/models/toast.interface';
import { ToastComponent } from './core/toast/toast.component';
import { UtilsService } from './core/services/utils.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;
  isHandset = false;
  @ViewChild(ToastComponent) toastComponent: ToastComponent;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private toastService: ToastService,
    private utilsService: UtilsService,
  ) {
    // Toast message service subscriptor for app
    this.toastService.getToast().subscribe((toast: IToast) => {
      this.toastComponent.open(toast);
    });

    // loading subscriptor
    this.utilsService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });

    // Breakpoint mobile subscriptor
    this.isHandset$.subscribe((isHandset) => {
      if (this.isHandset !== isHandset) {
        if (!isHandset) {
          this.setToggle(() => {});
        } else {
          this.setToggle(this.toggleSidenav);
        }
      }

      this.isHandset = isHandset;
    });
  }

  toggle: () => void = () => {};

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  private setToggle(toggleFunc: () => void) {
    this.toggle = toggleFunc;
    return true;
  }
}
