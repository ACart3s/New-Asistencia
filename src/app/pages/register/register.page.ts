import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from '../almacenamiento.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private almacenamiento: AlmacenamientoService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.minLength(15), Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  ngOnInit() {}
  async register() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      console.log('TEST QL', name);
      if (email.includes('@estudiante.cl')) {
        this.router.navigate(['./alumno']);
      } else if (email.includes('@profesor.cl')) {
        this.router.navigate(['./docente']);
      } else {
        console.log('QUE AWEONAO SE EQUIVOCO');
      }
    }
  }
}
