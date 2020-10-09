import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasPadreComponent } from './notas-padre.component';

describe('NotasPadreComponent', () => {
  let component: NotasPadreComponent;
  let fixture: ComponentFixture<NotasPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasPadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
