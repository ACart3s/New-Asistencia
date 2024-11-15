import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosDocentePage } from './cursos-docente.page';

describe('CursosDocentePage', () => {
  let component: CursosDocentePage;
  let fixture: ComponentFixture<CursosDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
