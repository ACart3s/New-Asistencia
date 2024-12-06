import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosAsistenciaPage } from './cursos-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: CursosAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosAsistenciaPageRoutingModule {}
