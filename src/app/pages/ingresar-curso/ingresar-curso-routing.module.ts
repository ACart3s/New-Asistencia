import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarCursoPage } from './ingresar-curso.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarCursoPageRoutingModule {}
