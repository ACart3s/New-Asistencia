import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarCursoPage } from './ingresar-curso.page';

describe('IngresarCursoPage', () => {
  let component: IngresarCursoPage;
  let fixture: ComponentFixture<IngresarCursoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
