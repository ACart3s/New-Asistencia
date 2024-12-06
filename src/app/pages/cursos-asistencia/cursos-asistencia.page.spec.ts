import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosAsistenciaPage } from './cursos-asistencia.page';

describe('CursosAsistenciaPage', () => {
  let component: CursosAsistenciaPage;
  let fixture: ComponentFixture<CursosAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
