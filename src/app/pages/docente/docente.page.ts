import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from '../almacenamiento.service';


interface perfil {
  name : string;
}
@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})

export class DocentePage implements OnInit {
  perfil : perfil = {name : ''}; 

  constructor(private almacenamiento : AlmacenamientoService) { }

  async ngOnInit() {
   this.perfil = await this.almacenamiento.get('username')
   console.log(this.perfil)
  }

}
