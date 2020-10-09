import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComportamientoPadreComponent } from './comportamiento-padre.component';

describe('ComportamientoPadreComponent', () => {
  let component: ComportamientoPadreComponent;
  let fixture: ComponentFixture<ComportamientoPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComportamientoPadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComportamientoPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
