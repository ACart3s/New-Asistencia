import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from '../almacenamiento.service';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController
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
      const { name, email, contra } = this.registerForm.value;
      if (email?.includes('@estudiante.cl')) {
        this.router.navigate(['/alumno']);
      } else if (email?.includes('@profesor.cl')) {
        this.router.navigate(['/docente']);
      } else {
      }
    }
  }
  markformGroupTouched (formGroup : any){
    Object.values(this.registerForm.controls).forEach((control : any) => {
      control.markAsTouched();
      if(control.controls){
        this.markformGroupTouched(control)
      }
    }) 
  }
}
