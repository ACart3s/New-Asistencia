import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router aquí
import { AlmacenamientoService } from '../almacenamiento.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private almacenamiento: AlmacenamientoService
  ) {
    // Inyecta Router en el constructor
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}
  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login exitoso con usuario:', username);

      if (username.includes('@estudiante.cl')) {
        console.log('Redirigiendo a la página de alumno...');
        this.almacenamiento.set('usuario', {
          correo: username,
          contraseña: password,
        });
        this.router.navigate(['/alumno']);
      } else if (
        username.includes('@profesor.cl')
      ) {
        console.log('Redirigiendo a la página de docente...');
        this.almacenamiento.set('usuario', {
          correo: username,
          contraseña: password,
        });
        this.router.navigate(['/docente']);
      } else {
        console.log('Correo no reconocido');
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
