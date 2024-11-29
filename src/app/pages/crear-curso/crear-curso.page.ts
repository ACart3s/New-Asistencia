import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlmacenamientoService } from '../almacenamiento.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.page.html',
  styleUrls: ['./crear-curso.page.scss'],
})
export class CrearCursoPage implements OnInit {
  cursoForm = this.formBuilder.nonNullable.group({
    name : ['',[Validators.minLength(6),Validators.required]],
    code : ['',[Validators.minLength(4),Validators.required]]
  })

  constructor(
    private formBuilder : FormBuilder,
    private almacenamiento : AlmacenamientoService
  ) { }
get name() {
  return this.cursoForm.controls.name;
}
get code () {
  return this.cursoForm.controls.code;
}

  ngOnInit() {
  }

}
