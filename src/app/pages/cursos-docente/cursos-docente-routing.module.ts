import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosDocentePage } from './cursos-docente.page';

const routes: Routes = [
  {
    path: '',
    component: CursosDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosDocentePageRoutingModule {}
