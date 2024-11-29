import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosEstudiantePage } from './cursos-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: CursosEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosEstudiantePageRoutingModule {}
