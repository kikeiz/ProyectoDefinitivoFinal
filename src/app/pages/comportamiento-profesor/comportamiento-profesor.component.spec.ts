import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComportamientoProfesorComponent } from './comportamiento-profesor.component';

describe('ComportamientoProfesorComponent', () => {
  let component: ComportamientoProfesorComponent;
  let fixture: ComponentFixture<ComportamientoProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComportamientoProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComportamientoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
