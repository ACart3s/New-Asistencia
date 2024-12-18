import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDocentePageRoutingModule } from './lista-docente-routing.module';

import { ListaDocentePage } from './lista-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDocentePageRoutingModule
  ],
  declarations: [ListaDocentePage]
})
export class ListaDocentePageModule {}
