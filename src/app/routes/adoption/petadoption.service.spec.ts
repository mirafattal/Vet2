/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PetadoptionService } from './petadoption.service';

describe('Service: Petadoption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetadoptionService]
    });
  });

  it('should ...', inject([PetadoptionService], (service: PetadoptionService) => {
    expect(service).toBeTruthy();
  }));
});
