import { Component, OnInit } from '@angular/core';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service'; 
import { Clase } from 'src/app/models/clase'
import { Cursos } from 'src/app/models/cursos';
import { Colegios } from 'src/app/models/colegios';
import { Asignaturas } from 'src/app/models/asignaturas';
@Component({
  selector: 'app-aniadir-clase',
  templateUrl: './aniadir-clase.component.html',
  styleUrls: ['./aniadir-clase.component.css']
})
export class AniadirClaseComponent implements OnInit {
  public insertar:boolean
  public cursos: Cursos[]
  public colegios: Colegios[]
  public asignaturas: Asignaturas[]

  constructor(public createClase: AñadirClaseService) {
    this.insertar = false
    this.cursos = this.createClase.cursos
    this.colegios = this.createClase.colegio
    this.asignaturas = this.createClase.asignaturas

   }

  ngOnInit(): void {
  }

  insertarAlumnos(){
    this.insertar = true
  }

  public crearClase(data:any){
    console.log(this.cursos);
    
    this.insertar = false
    let clase = new Clase(data.nombre, this.createClase.id_profesor, Number(data.asignatura), Number(data.curso))
    this.createClase.aniadirClases(clase).subscribe((data=>{
      console.log(data);
    }))
  }
}
