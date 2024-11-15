import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosDocentePageRoutingModule } from './cursos-docente-routing.module';

import { CursosDocentePage } from './cursos-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosDocentePageRoutingModule
  ],
  declarations: [CursosDocentePage]
})
export class CursosDocentePageModule {}
