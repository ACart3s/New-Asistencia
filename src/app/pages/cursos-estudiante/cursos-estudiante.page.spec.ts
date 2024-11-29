import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosEstudiantePage } from './cursos-estudiante.page';

describe('CursosEstudiantePage', () => {
  let component: CursosEstudiantePage;
  let fixture: ComponentFixture<CursosEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
