import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router aquí
import { AlmacenamientoService } from '../almacenamiento.service';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';


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
    private almacenamiento: AlmacenamientoService,
    private authService : AuthService,
    private alertController : AlertController
  ) {
    // Inyecta Router en el constructor
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}
  async login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const {data, error} = await this.authService.signIn({email : username, password : password})
      if (error) {
        await this.showAlert('Error','Datos ingresados incorrectos. Por favor revise sus credenciales')   
        return    
      }
      if (data.user){
        await this.almacenamiento.set('userId', data.user.id)
        console.log(data.user);  
      }

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
  async showAlert(header : string, message : string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons : ['Aceptar']

    })
    await alert.present()
  }
}
