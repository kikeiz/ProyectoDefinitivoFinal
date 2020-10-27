import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComportamientoPadreGlobalComponent } from './comportamiento-padre-global.component';

describe('ComportamientoPadreGlobalComponent', () => {
  let component: ComportamientoPadreGlobalComponent;
  let fixture: ComponentFixture<ComportamientoPadreGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComportamientoPadreGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComportamientoPadreGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
