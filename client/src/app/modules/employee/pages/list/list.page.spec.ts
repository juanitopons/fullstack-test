/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmployeeListPage } from './list.page';

describe('ListComponent', () => {
  let component: EmployeeListPage;
  let fixture: ComponentFixture<EmployeeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
