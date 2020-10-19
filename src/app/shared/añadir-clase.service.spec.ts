import { TestBed } from '@angular/core/testing';

import { AñadirClaseService } from './añadir-clase.service';

describe('AñadirClaseService', () => {
  let service: AñadirClaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AñadirClaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
