import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Clases } from 'src/supabase';
import { AlmacenamientoService } from '../almacenamiento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
//Por ultimo va a revisar el codigo o no?
export class GenerateQrPage implements OnInit {
  subjectId: any;
  QrSesion: any;
  docente: any;

  constructor(
    private dataService: DataService,
    private almacenamiento: AlmacenamientoService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.subjectId = await this.route.snapshot.paramMap.get('id');
    if (!this.subjectId) return;
    const { data, error } = await this.dataService.crearClase(
      new Date(),
      this.subjectId
    );

    if (error) {
      console.log(error);
    }
    if (data) {
      this.QrSesion = data.id;
    }
  }

  //Con que una tailandesa queria HUMBERTO YA BASTA DE IMBECILIDADES
}
