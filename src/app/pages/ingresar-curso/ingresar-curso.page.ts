import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlmacenamientoService } from '../almacenamiento.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ingresar-curso',
  templateUrl: './ingresar-curso.page.html',
  styleUrls: ['./ingresar-curso.page.scss'],
})
export class IngresarCursoPage implements OnInit {
  subjectId : any;
  lista: any;
  info: any = {name:'', code : ''};

  constructor(
    private dataService: DataService,
    private almacenamiento: AlmacenamientoService,
    private activeRouted: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const subjectId = this.activeRouted.snapshot.paramMap.get('id');
    if (!subjectId) return;
    this.subjectId = subjectId;
    const { data, error } = await this.dataService.mostrarLista(subjectId);
    if (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error en obtener la asistencia',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    if (data) {
      console.log(data);
      this.info = data[0].Class.Subject;
      this.lista = data;
    }
  }
}
