import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlmacenamientoService } from '../almacenamiento.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor(private dataService : DataService,
    private alertController: AlertController,
    private almacenamiento: AlmacenamientoService
  ) { }
  asistencia: any;
  async ngOnInit() {
    const idUsuario = await this.almacenamiento.get('userId');
    const { data, error } = await this.dataService.verAsistencia(idUsuario);
    if(error){
      console.log(error);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al cargar la asistencia',
        buttons: ['OK']
      });
      await alert.present();
    }
    if(data){
      console.log(data);
      this.asistencia = data;
    }
  }

}
