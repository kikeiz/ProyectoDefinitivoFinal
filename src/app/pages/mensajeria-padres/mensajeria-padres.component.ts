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
    this.mensajes = [new Comunications(null, "Su hijo no ha faltado a clase", "Asistencia", '1996-08-09', true), 
                    new Comunications("", "Su hijo ha llegado tarde", "Puntualidad", '1996-08-09', true),
                    new Comunications(null, "Su hijo se despista en clase, preta poca atención y juega con sus compañeros de forma habitual", "Atencion", '1996-08-09', false),
                    new Comunications(null, "Su hijo ha participado hoy en clase", "Participacion", '1996-08-09', true),
                    new Comunications(null, "Su hijo ha obtenido una nota de calificación: aprobado", "Nota", '1996-08-09', false),
                    new Comunications(null, "Su hijo ha entregado las tareas", "Deberes", '1996-08-09', true)]
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
