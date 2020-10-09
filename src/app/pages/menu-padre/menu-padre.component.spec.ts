import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPadreComponent } from './menu-padre.component';

describe('MenuPadreComponent', () => {
  let component: MenuPadreComponent;
  let fixture: ComponentFixture<MenuPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
