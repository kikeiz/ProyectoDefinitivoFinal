import { Component, OnInit } from '@angular/core';
import { Comunications } from 'src/app/models/comunications';

@Component({
  selector: 'app-mensajeria-padres',
  templateUrl: './mensajeria-padres.component.html',
  styleUrls: ['./mensajeria-padres.component.css']
})
export class MensajeriaPadresComponent implements OnInit {
  public mensaje:Comunications
  public mensajes:Comunications[]
  public mostrar:boolean
  public mensajeFinal:string
  constructor() { 
    this.mensajes = []
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
