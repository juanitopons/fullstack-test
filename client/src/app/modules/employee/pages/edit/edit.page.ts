import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../../../core/services/toast.service';
import { ToastComponent } from '../../../../core/toast/toast.component';
import { IToast } from '../../../../core/models/toast.interface';

@Component({
  selector: 'employee-edit',
  templateUrl: './edit.page.pug',
  styleUrls: ['./edit.page.scss'],
})
export class EmployeeEditPage implements OnInit {
  @ViewChild(ToastComponent) toastComponent: ToastComponent;

  constructor() {
  }

  ngOnInit() {}
}
