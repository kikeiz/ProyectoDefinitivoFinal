import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniadirAlumnoComponent } from './aniadir-alumno.component';

describe('AniadirAlumnoComponent', () => {
  let component: AniadirAlumnoComponent;
  let fixture: ComponentFixture<AniadirAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniadirAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AniadirAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
