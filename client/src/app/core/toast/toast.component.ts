import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IToast } from 'src/app/core/models/toast.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.pug',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent implements OnInit {
  public toast: IToast;

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  public open(toast: IToast) {
    this.toast = toast;
    this.snackBar.open(toast.message, toast.options.closeString, {
      duration: toast.options.duration,
      panelClass: toast.style,
    });
  }
}
