import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosAsistenciaPageRoutingModule } from './cursos-asistencia-routing.module';

import { CursosAsistenciaPage } from './cursos-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosAsistenciaPageRoutingModule
  ],
  declarations: [CursosAsistenciaPage]
})
export class CursosAsistenciaPageModule {}
