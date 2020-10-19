import { TestBed } from '@angular/core/testing';

import { AñadirAlumnoService } from './añadir-alumno.service';

describe('AñadirAlumnoService', () => {
  let service: AñadirAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AñadirAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
