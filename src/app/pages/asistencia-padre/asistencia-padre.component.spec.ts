import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaPadreComponent } from './asistencia-padre.component';

describe('AsistenciaPadreComponent', () => {
  let component: AsistenciaPadreComponent;
  let fixture: ComponentFixture<AsistenciaPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaPadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
