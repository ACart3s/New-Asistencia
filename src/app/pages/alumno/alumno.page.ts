import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlmacenamientoService } from '../almacenamiento.service';

interface perfil {
  name : string;
}
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})

export class AlumnoPage implements OnInit {
  cursos: any;
  perfil : perfil = {name :''};

  constructor(private dataService : DataService,
    private almacenamiento : AlmacenamientoService, 

  ) { }

  
  async ngOnInit() {
    await this.almacenamiento.get('userId')
    this.cursos = await this.dataService.getCursos('userId')
    this.perfil = await this.almacenamiento.get('username') as perfil

    
  }
  
  



  
}
