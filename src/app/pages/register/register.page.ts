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
      contra: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  ngOnInit() {}
   register() {
    console.log("entra la wea o no")
    if (this.registerForm.valid) {
      console.log("debugg")
      const { name, email, contra } = this.registerForm.value;
      console.log('TEST QL', name);
      if (email.includes('@estudiante.cl')) {
        this.router.navigate(['/alumno']);
      } else if (email.includes('@profesor.cl')) {
        this.router.navigate(['/docente']);
      } else {
        console.log('QUE AWEONAO SE EQUIVOCO');
      }
    }
  }
}
