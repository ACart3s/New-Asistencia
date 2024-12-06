import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { AlmacenamientoService } from '../almacenamiento.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  resultado = '';
  profileId = '';

  constructor(
    private modal: ModalController,
    private storageService: AlmacenamientoService,
    private dataService: DataService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.profileId = await this.storageService.get('userId');
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
      if (navigator.onLine) {
        this.resultado = data?.barcode?.displayValue;
        const { data: asistencia, error } =
          await this.dataService.registrarAsistencia(
            this.profileId,
            this.resultado
          );
        if (error) {
          await this.showAlert('Error', 'Error al registrar asistencia');
          return;
        }
        if (asistencia) {
          await this.showAlert('No error', 'Clase registrada con éxito papito');
        }
      }
    } else {
      this.resultado = data?.barcode?.displayValue;
      const pendientes = await this.storageService.get('pendientes');
      if (pendientes) {
        if (!pendientes.includes(this.resultado)) {
          pendientes.push(this.resultado);
          await this.storageService.set('pendientes', pendientes);
          await this.showAlert('No error', 'Se ha registrado con exito');
        } else {
          await this.showAlert('Error', 'La clase ya se encuentra registrada');
        }
      } else {
        await this.storageService.set('pendientes', [this.resultado]);
        await this.showAlert('No error', 'Se chanchi-registró');
      }
    }
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
