import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaCadastralComponent } from './ficha-cadastral.component';

describe('FichaCadastralComponent', () => {
  let component: FichaCadastralComponent;
  let fixture: ComponentFixture<FichaCadastralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaCadastralComponent]
    });
    fixture = TestBed.createComponent(FichaCadastralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
