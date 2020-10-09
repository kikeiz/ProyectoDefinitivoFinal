import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniadirClaseComponent } from './aniadir-clase.component';

describe('AniadirClaseComponent', () => {
  let component: AniadirClaseComponent;
  let fixture: ComponentFixture<AniadirClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniadirClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AniadirClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
