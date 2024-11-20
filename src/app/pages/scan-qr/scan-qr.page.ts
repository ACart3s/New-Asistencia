import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  resultado = '';

  constructor(private modal: ModalController) {}

  ngOnInit() {
    this.scanQR();
  }

  async scanQR() {
    const modal = await this.modal.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { formats: [], LensFacing: LensFacing.Back },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.resultado = data;
    }
  }
}
