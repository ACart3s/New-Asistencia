import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from '../almacenamiento.service';
import { DataService } from 'src/app/services/data.service';
import { Data } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cursos-docente',
  templateUrl: './cursos-docente.page.html',
  styleUrls: ['./cursos-docente.page.scss'],
})
export class CursosDocentePage implements OnInit {
  cursos: any;
  seleccio : any;

  constructor(
    private almacenamiento: AlmacenamientoService,
    private dataService: DataService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const idProfesor = await this.almacenamiento.get('userId');
    const { data, error } = await this.dataService.selectCursos(idProfesor);
    if (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error en obtener los cursos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    if (data) {
      console.log(data);
      this.cursos = data;
    }

  }
  async seleccion(event: any){
    const sele = event.detail.value
    this.seleccio = sele
  }
}
