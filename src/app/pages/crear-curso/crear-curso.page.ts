import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlmacenamientoService } from '../almacenamiento.service';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.page.html',
  styleUrls: ['./crear-curso.page.scss'],
})
export class CrearCursoPage implements OnInit {
  cursoForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.minLength(6), Validators.required]],
    code: ['', [Validators.minLength(4), Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private almacenamiento: AlmacenamientoService,
    private dataService: DataService,
    private alertController: AlertController
  ) {}
  get name() {
    return this.cursoForm.controls.name;
  }
  get code() {
    return this.cursoForm.controls.code;
  }

  ngOnInit() {}
  async curso() {
    console.log('entramos o no');
    if (!this.cursoForm) return;
    if (this.cursoForm.valid) {
      const { data, error } = await this.dataService.crearCurso(
        this.name.value,
        this.code.value,
        (
          await this.almacenamiento.get('username')
        ).idProfessor
      );

      if (error) {
        console.log(error);
        await this.showAlert('Error', 'Error al crear el Chanchi-Curso :C');
        return;
      }
      await this.showAlert('No error', 'Chanchi-Curso creado con exito :)');
    }
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
