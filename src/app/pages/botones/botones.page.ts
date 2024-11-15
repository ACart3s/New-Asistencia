import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.page.html',
  styleUrls: ['./botones.page.scss'],
})
export class BotonesPage implements OnInit {

  mensaje:string=''

  constructor(private router:Router) { }

  ngOnInit() {
  }

  saludo(){
    console.log("hola");
    this.mensaje='Hola desde el botón amarillo';
  }

  navegar(){
    console.log("Me voy a home");
    this.router.navigate(["/home"]);
  }
}
