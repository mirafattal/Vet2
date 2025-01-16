import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingInventoryComponent } from './adding-inventory.component';

describe('AddingInventoryComponent', () => {
  let component: AddingInventoryComponent;
  let fixture: ComponentFixture<AddingInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
