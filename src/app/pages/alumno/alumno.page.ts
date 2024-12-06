import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlmacenamientoService } from '../almacenamiento.service';

interface perfil {
  name: string;
}
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  cursos: any;
  perfil: perfil = { name: '' };

  constructor(
    private dataService: DataService,
    private almacenamiento: AlmacenamientoService
  ) {}

  async ngOnInit() {
    console.log('holi');
    const userId = await this.almacenamiento.get('userId');
    this.cursos = await this.dataService.getCursos(userId);
    this.perfil = (await this.almacenamiento.get('username')) as perfil;
    if (navigator.onLine) {
      const pendientes = await this.almacenamiento.get('pendientes');
      if (pendientes) {
        pendientes.forEach(async (pendiente: any) => {
          const { data, error } = await this.dataService.registrarAsistencia(
            userId,
            pendiente
          );
          if (error) return;
          if (data) {
            const nuevosPendientes = pendientes.filter(
              (item: any) => item.id !== pendiente.id
            );
            await this.almacenamiento.set('pendientes', nuevosPendientes);
          }
        });
      }
    }
  }
}
