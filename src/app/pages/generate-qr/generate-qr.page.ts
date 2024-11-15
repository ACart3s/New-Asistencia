import { Component, OnInit } from '@angular/core';
import { Clases } from 'src/supabase';


@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
//Por ultimo va a revisar el codigo o no?

export class GenerateQrPage implements OnInit {
  ClasesNueva: Clases = {
    id: 0,
    schedule: '',
    idAsignatura: 0,
    idAsistencia: 0,
  };
  QrSesion: any;

  constructor() {}

  ngOnInit() {
    this.QrSesion = 'CHANCHIQR';
  }
  //Con que una tailandesa queria el csm
}
