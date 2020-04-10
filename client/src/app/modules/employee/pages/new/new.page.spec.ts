/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepartmentNewPage } from './new.page';

describe('NewComponent', () => {
  let component: DepartmentNewPage;
  let fixture: ComponentFixture<DepartmentNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentNewPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
