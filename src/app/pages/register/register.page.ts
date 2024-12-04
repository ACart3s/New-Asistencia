import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from '../almacenamiento.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.minLength(15), Validators.required]],
    email: ['', [Validators.required]],
    contra: ['', [Validators.minLength(6), Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private almacenamiento: AlmacenamientoService,
    private alertController: AlertController,
    private authService: AuthService,
    private dataService : DataService
  ) {}
  get name() {
    return this.registerForm.controls.name;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get contra() {
    return this.registerForm.controls.contra;
  }
  ngOnInit() {}
  async register() {
    this.markformGroupTouched(this.registerForm);
    if (!this.registerForm.valid) return;
    if (this.registerForm.valid) {
      const { data, error } = await this.authService.signUp({
        email: this.email.value,
        password: this.contra.value,
        metadata: {
          name: this.name.value,
          is_student: !this.email.value.includes('@profesor.cl'),
        },
      });
      if (error) {
        await this.showAlert('Error', 'Error al registrar el usuario');
        return;
      }
      if (data) {
        await this.almacenamiento.set('Usuario', {
          email: this.email.value,
          password: this.contra.value,
          name: this.name.value,
        });
        await this.showAlert(
          'No error',
          'El usuario se ha registrado con éxito'
        );
        this.router.navigate([!this.email.value.includes('@profesor.cl') ? '/alumno' : '/docente'])
      }
    }
  }
  markformGroupTouched(formGroup: any) {
    Object.values(this.registerForm.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markformGroupTouched(control);
      }
    });
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
