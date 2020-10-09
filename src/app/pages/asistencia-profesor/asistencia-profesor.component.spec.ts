import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaProfesorComponent } from './asistencia-profesor.component';

describe('AsistenciaProfesorComponent', () => {
  let component: AsistenciaProfesorComponent;
  let fixture: ComponentFixture<AsistenciaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
