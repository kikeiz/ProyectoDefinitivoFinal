import { Component, OnInit } from '@angular/core';
import { Comunications } from 'src/app/models/comunications';
import { MensajesService } from 'src/app/shared/mensajes.service';

@Component({
  selector: 'app-mensajeria-padres',
  templateUrl: './mensajeria-padres.component.html',
  styleUrls: ['./mensajeria-padres.component.css']
})
export class MensajeriaPadresComponent implements OnInit {
  public mensajes:Comunications[]
  public mensaje: Comunications
  public mostrar:boolean
  constructor(public mensajeService:MensajesService) { 
    this.mensajes = this.mensajeService.mensajesPadres
    this.mostrar = false
    this.mensaje = null
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
