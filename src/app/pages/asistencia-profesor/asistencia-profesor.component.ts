import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/models/asistencia';
import {Hijos} from 'src/app/models/hijos'

@Component({
  selector: 'app-asistencia-profesor',
  templateUrl: './asistencia-profesor.component.html',
  styleUrls: ['./asistencia-profesor.component.css']
})
export class AsistenciaProfesorComponent implements OnInit {
  public asiste: boolean
  public mostrar: boolean
  public asistencias: Asistencia[]
  constructor() {
    this.asiste = false
    this.mostrar = false
    this.asistencias = [
      new Asistencia(true, '1996-08-09', "Pedro", "Martinez", "Biologia"), new Asistencia(false, '2008-08-08', "javier", "Ner", "Biologia")
    ]
   }

  ngOnInit(): void {
  }

  pasarLista(){
    this.asiste = true
  }

  enviar(){
    this.asiste = false
  }

  mostrarAsistencia(){
    this.mostrar = true
  }

  cerrar(){
    this.mostrar = false
  }
  

}
