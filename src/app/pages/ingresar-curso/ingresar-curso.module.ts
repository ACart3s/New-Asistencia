import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarCursoPageRoutingModule } from './ingresar-curso-routing.module';

import { IngresarCursoPage } from './ingresar-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarCursoPageRoutingModule
  ],
  declarations: [IngresarCursoPage]
})
export class IngresarCursoPageModule {}
