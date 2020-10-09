import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionProfesorComponent } from './informacion-profesor.component';

describe('InformacionProfesorComponent', () => {
  let component: InformacionProfesorComponent;
  let fixture: ComponentFixture<InformacionProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
