import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { AlmacenamientoService } from '../almacenamiento.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cursos-asistencia',
  templateUrl: './cursos-asistencia.page.html',
  styleUrls: ['./cursos-asistencia.page.scss'],
})
export class CursosAsistenciaPage implements OnInit {
  seleccio : any;
  cursos : any;
  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private almacenamiento: AlmacenamientoService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const idProfesor = await this.almacenamiento.get('userId')
    if (!idProfesor) return;
    const { data, error } = await this.dataService.selectCursos(idProfesor);
    console.log(data)
    if (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al seleccionar el curso',
        buttons: ['Aceptar'],
      });
      alert.present();
    }
    if (data){
      console.log('xd')
      console.log(data)
      this.cursos = data;

    } 

  }
  async seleccion(event: any){
    const sele = event.detail.value
    console.log(sele)
    this.seleccio = sele
  }
  
}
