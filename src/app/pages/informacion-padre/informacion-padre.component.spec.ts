import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPadreComponent } from './informacion-padre.component';

describe('InformacionPadreComponent', () => {
  let component: InformacionPadreComponent;
  let fixture: ComponentFixture<InformacionPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
