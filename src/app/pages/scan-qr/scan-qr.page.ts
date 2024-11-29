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


  constructor(private modal: ModalController, 
    private storageService : AlmacenamientoService,
    private dataService : DataService,
    private alertController : AlertController
  ) {}

  async ngOnInit() {
    this.profileId = await this.storageService.get('userId')
    console.log(this.profileId)
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
      const{data: asistencia ,error} =  await this.dataService.registrarAsistencia(this.profileId,this.resultado)
      if (error) {
        await this.showAlert('error','Error al registrar asistencia')
        return
      }
      if (asistencia) {
        await this.showAlert('No error', 'Clase registrada con éxito papito')
      }
    }
  }
  async showAlert(header : string, message : string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons : ['Aceptar']

    })
    await alert.present()
  }

}
