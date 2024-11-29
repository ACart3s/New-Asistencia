import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CrearCursoPageRoutingModule } from './crear-curso-routing.module';

import { CrearCursoPage } from './crear-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCursoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearCursoPage]
})
export class CrearCursoPageModule {}
