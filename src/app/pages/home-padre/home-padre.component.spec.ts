import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePadreComponent } from './home-padre.component';

describe('HomePadreComponent', () => {
  let component: HomePadreComponent;
  let fixture: ComponentFixture<HomePadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
