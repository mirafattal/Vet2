/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddVaccineComponent } from './add-vaccine.component';

describe('AddVaccineComponent', () => {
  let component: AddVaccineComponent;
  let fixture: ComponentFixture<AddVaccineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVaccineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
