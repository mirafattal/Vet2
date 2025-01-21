/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddingPetExistComponent } from './adding-pet-exist.component';

describe('AddingPetExistComponent', () => {
  let component: AddingPetExistComponent;
  let fixture: ComponentFixture<AddingPetExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingPetExistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingPetExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
