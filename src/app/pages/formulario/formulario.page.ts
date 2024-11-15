import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioLog } from 'src/app/interfaces/i_usuario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  //username:string="" ya no sirve

  usr:UsuarioLog={
    username:'',
    password:''

  }
  constructor(private router:Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  iniciar_sesion(){
    console.log("Iniciar sesion");
    if(this.usr.username=="waco" && this.usr.password=="123"){
      this.router.navigate(["/home"]);
    }
    else{
      this.alerta();
    }
  }


  async alerta(){

   
    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      subHeader: 'Usuario y/o contraseña incorrecta',
      message: 'chao!!!!',
      backdropDismiss:false,
      buttons: [ {
        text:"Aceptar",
        cssClass:'btn-verde',
        handler:()=>{
          console.log("Apreto aceptar desde controller");
        }
      },],
    });

    await alert.present();
  }

}
