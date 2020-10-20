import { Component, OnInit } from '@angular/core';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service'; 
import { Clase } from 'src/app/models/clase'
import { Cursos } from 'src/app/models/cursos';
import { Colegios } from 'src/app/models/colegios';
import { Asignaturas } from 'src/app/models/asignaturas';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Hijos } from 'src/app/models/hijos';
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
  public alumnos:Hijos[]

  constructor(public createClase: AñadirClaseService) {
    this.insertar = false
    this.cursos = this.createClase.cursos
    this.colegios = this.createClase.colegio
    this.asignaturas = this.createClase.asignaturas
    this.alumnos = []
   }

  ngOnInit(): void {
  }

  insertarAlumnos(){
    this.insertar = false
  }

  public crearClase(data:any){
    console.log(data);
    this.insertar = true
    console.log(this.cursos);
    let clase = new Clase(data.nombre, Number(data.colegio), this.createClase.id_profesor, Number(data.asignatura), Number(data.curso))
    this.createClase.aniadirClases(clase).subscribe((data=>{
      let datos:any = data
      this.createClase.getClase(datos.insertId).subscribe((dataa=>{
        let array:any = dataa
        this.createClase.idClase(array[0].id_clase, array[0].id_colegio, array[0].id_curso)
        this.createClase.getAlumnos(array[0].id_curso, array[0].id_colegio).subscribe((data=>{
          console.log(data);
          let datos:any = data
          for(let i=0; i<datos.length; i++){
            this.alumnos.push(new Hijos(datos[i].nombre, datos[i].apellidos))
          }
          console.log(this.alumnos);
          
        }))
      }))
    }))
  }
}
