import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaProfesorComponent } from './mensajeria-profesor.component';

describe('MensajeriaProfesorComponent', () => {
  let component: MensajeriaProfesorComponent;
  let fixture: ComponentFixture<MensajeriaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeriaProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeriaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
