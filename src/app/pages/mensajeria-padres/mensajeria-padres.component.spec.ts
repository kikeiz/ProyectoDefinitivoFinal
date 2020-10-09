import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaPadresComponent } from './mensajeria-padres.component';

describe('MensajeriaPadresComponent', () => {
  let component: MensajeriaPadresComponent;
  let fixture: ComponentFixture<MensajeriaPadresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeriaPadresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeriaPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
