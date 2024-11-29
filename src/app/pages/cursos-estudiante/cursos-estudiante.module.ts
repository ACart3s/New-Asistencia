import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosEstudiantePageRoutingModule } from './cursos-estudiante-routing.module';

import { CursosEstudiantePage } from './cursos-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosEstudiantePageRoutingModule
  ],
  declarations: [CursosEstudiantePage]
})
export class CursosEstudiantePageModule {}
