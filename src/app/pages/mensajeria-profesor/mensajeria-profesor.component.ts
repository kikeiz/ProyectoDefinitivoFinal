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
    this.mensajeFinal = this.mensajes[index].contenido
  }

  cerrar(){
    this.mostrar = false
  }
}
