import { Component, OnInit } from '@angular/core';
import { Comunications } from 'src/app/models/comunications';

@Component({
  selector: 'app-mensajeria-profesor',
  templateUrl: './mensajeria-profesor.component.html',
  styleUrls: ['./mensajeria-profesor.component.css']
})
export class MensajeriaProfesorComponent implements OnInit {
  public mensaje: Comunications
  public mensajes:Comunications[] = [
    new Comunications(null, "Justifico la asistencia de mi hijo por razones medicas", "Justificante", "2019-08-09", null, "Biologia", "Carlos"),
    new Comunications(null, "Justifico la asistencia de mi hijo por razones personales", "Justificante", "2020-08-09", null, "Matematicas", "Rodrigo"),
  ]
  public mostrar:boolean
  public mensajeFinal:string
  constructor() { 
    this.mostrar = false
  }

  ngOnInit(): void {
  }

  mostrarMensaje(index:number){
    this.mostrar = true
    this.mensajeFinal = this.mensajes[index].mensaje
  }

  cerrar(){
    this.mostrar = false
  }
}
