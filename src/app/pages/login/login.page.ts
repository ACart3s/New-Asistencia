import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales = this.fb.nonNullable.group({
    email : ['saimon@alumno.cl', Validators.required],
    password : ['123456', Validators.required]

  })

  constructor(
    private fb: FormBuilder,

  ) { }
  get email () {
    return this.credenciales.controls.email;
  }
  get password() {
    return this.credenciales.controls.password;
  }

  ngOnInit() {
  }
  async login() {
    
  }

}
