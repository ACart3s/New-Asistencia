import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Clases } from 'src/supabase';



@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
//Por ultimo va a revisar el codigo o no?

export class GenerateQrPage implements OnInit {
  subjectId : string = '252b0ecd-82e1-49f9-8d3b-b9a78015b28d'
  QrSesion: any;

  constructor(private dataService : DataService) {}

   async ngOnInit() {
    const {data, error} = await this.dataService.crearClase(new Date(), this.subjectId)
    if (error){
      console.log(error)
    } 
    if (data){
      this.QrSesion = data.id;
    }
  }
  


  //Con que una tailandesa queria HUMBERTO YA BASTA DE IMBECILIDADES
}
