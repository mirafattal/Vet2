/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddPetAdoptionComponent } from './add-pet-adoption.component';

describe('AddPetAdoptionComponent', () => {
  let component: AddPetAdoptionComponent;
  let fixture: ComponentFixture<AddPetAdoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPetAdoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
