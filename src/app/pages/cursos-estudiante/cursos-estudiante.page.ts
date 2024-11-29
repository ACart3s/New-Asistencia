import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlmacenamientoService } from '../almacenamiento.service';

@Component({
  selector: 'app-cursos-estudiante',
  templateUrl: './cursos-estudiante.page.html',
  styleUrls: ['./cursos-estudiante.page.scss'],
})
export class CursosEstudiantePage implements OnInit {
  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private almacenamiento: AlmacenamientoService
  ) {}
  clases: any;
  async ngOnInit() {
    const idUsuario = await this.almacenamiento.get('userId');
    const { data, error } = await this.dataService.getCursos(idUsuario);
    if (error) {
      console.log(error);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al cargar los cursos',
        buttons: ['OK'],
      });
      await alert.present();
    }
    if (data) {
      console.log(data);
      this.clases = data;
    }
  }
}
