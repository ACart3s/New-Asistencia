import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlmacenamientoService } from '../almacenamiento.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-docente',
  templateUrl: './lista-docente.page.html',
  styleUrls: ['./lista-docente.page.scss'],
})
export class ListaDocentePage implements OnInit {
  constructor(
    private dataService: DataService,
    private almacenamiento: AlmacenamientoService,
    private alertController: AlertController,
    private router: ActivatedRoute
  ) {}
  lista: any;
  idAsignatura = this.router.snapshot.paramMap.get('id');

  async ngOnInit() {
    if (!this.idAsignatura) return;
    console.log(this.idAsignatura);
    const { data, error } = await this.dataService.alumnosnoAsignaturas(
      this.idAsignatura
    );
    if (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al obtener la lista de estudiantes',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    if (data) {
      console.log(data);
      this.lista = data;
    }
  }
  async inscribirEstudiante(idEstudiante: string) {
    if (!this.idAsignatura) return;
    const { data, error } = await this.dataService.alumnosnoAsignaturas(
      this.idAsignatura
    );
    if (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al obtener los estudiantes',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    if (data) {
      console.log(data);
      const { data: metodo, error: metodoError } =
        await this.dataService.registrarCurso(idEstudiante, this.idAsignatura);
      if (metodoError) {
        const alerta = await this.alertController.create({
          header: 'Error',
          message: 'Error al registrar al estudiante al curso',
          buttons: ['Aceptar'],
        });
        await alerta.present();
      } else {
        const alerta = await this.alertController.create({
          header: 'No error',
          message: 'Chanchi inscrito con éxito',
          buttons: ['Aceptar'],
        });
        await alerta.present();
      }
    }
  }
}
