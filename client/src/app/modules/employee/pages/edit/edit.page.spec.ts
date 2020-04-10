/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepartmentEditPage } from './edit.page';

describe('EditComponent', () => {
  let component: DepartmentEditPage;
  let fixture: ComponentFixture<DepartmentEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentEditPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
