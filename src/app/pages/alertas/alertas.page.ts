import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})
export class AlertasPage implements OnInit {

  alertButtons = [
    {
    text:'Aceptar',
    cssClass:'btn-verde',
    handler:()=>{
      console.log("Apreto aceptar");
    }
  },
  
  {
    text:'Cancelar',
    cssClass:'btn-cancelar',
    handler:()=>{
      this.destruir()
    }
  }];

  constructor(private alertController:AlertController) { }

  ngOnInit() {
  }

  destruir(){
    console.log("Con esto se destruye el mundo!!!!");
  }

  async alerta(){
    let nombre="wacoldito"
   
    const alert = await this.alertController.create({
      header: 'Esto es de alert controller',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      backdropDismiss:false,
      buttons: [ {
        text:nombre,
        cssClass:'btn-verde',
        handler:()=>{
          console.log("Apreto aceptar desde controller");
        }
      },],
    });

    await alert.present();
  }

}
