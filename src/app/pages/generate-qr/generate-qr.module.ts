import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateQrPageRoutingModule } from './generate-qr-routing.module';

import { GenerateQrPage } from './generate-qr.page';

//Ta leyendo el codigo o no profe 
//Import para generar el codigo qr pa no perderme
import { QrCodeModule } from 'ng-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateQrPageRoutingModule,
    QrCodeModule
  ],
  declarations: [GenerateQrPage]
})
export class GenerateQrPageModule {}
