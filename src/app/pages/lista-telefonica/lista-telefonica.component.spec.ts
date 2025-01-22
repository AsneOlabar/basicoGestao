import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTelefonicaComponent } from './lista-telefonica.component';

describe('ListaTelefonicaComponent', () => {
  let component: ListaTelefonicaComponent;
  let fixture: ComponentFixture<ListaTelefonicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTelefonicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTelefonicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
