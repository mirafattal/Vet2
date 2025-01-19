/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddLabComponent } from './add-lab.component';

describe('AddLabComponent', () => {
  let component: AddLabComponent;
  let fixture: ComponentFixture<AddLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
