import { Component, OnInit } from '@angular/core';
import { Comunications } from 'src/app/models/comunications';
import { MensajesService } from 'src/app/shared/mensajes.service';

@Component({
  selector: 'app-mensajeria-profesor',
  templateUrl: './mensajeria-profesor.component.html',
  styleUrls: ['./mensajeria-profesor.component.css']
})
export class MensajeriaProfesorComponent implements OnInit {
  public mensaje: Comunications
  public mensajes:Comunications[]
  public mostrar:boolean
  public mensajeFinal:string
  constructor(public mensajeService:MensajesService) { 
    this.mostrar = false
    this.mensajes = this.mensajeService.mensajesProfes
  }

  ngOnInit(): void {
  }

  mostrarMensaje(index:number){
    this.mostrar = true
    this.mensaje = this.mensajes[index]
  }

  cerrar(){
    this.mostrar = false
  }
}
