import { Component, OnInit } from '@angular/core';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service'; 
import { Clase } from 'src/app/models/clase';
import { Cursos } from 'src/app/models/cursos';
import { Colegios } from 'src/app/models/colegios';
import { Asignaturas } from 'src/app/models/asignaturas';
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
  public ids:number[]

  constructor(public createClase: AñadirClaseService) {
    this.insertar = false
    this.cursos = this.createClase.cursos
    this.colegios = this.createClase.colegio
    this.asignaturas = this.createClase.asignaturas
    this.alumnos = []
    this.ids = []
   }

  ngOnInit(): void {
  }

  chequeado(index:number, isChecked:boolean){
    if(isChecked){
      this.ids.push(index)
      console.log(this.ids);
    }else{
      let valor = this.ids.indexOf(index)
      this.ids.splice(valor, 1)
      console.log(this.ids);
    }
    
  }

  insertarAlumnos(){
    this.insertar = false
    for(let i=0; i<this.ids.length; i++){
      this.createClase.alumnosClase(this.ids[i],this.createClase.id_clase).subscribe((data=>{
        console.log(data);
      }))
    }    
    
  }

  public crearClase(data:any){
    this.insertar = true
    let clase = new Clase(data.nombre, Number(data.colegio), this.createClase.id_profesor, Number(data.asignatura), Number(data.curso))
    
    this.createClase.aniadirClases(clase).subscribe((data=>{
      let datos:any = data
      this.createClase.getClase(datos.insertId).subscribe((dataa=>{
        let array:any = dataa
        this.createClase.getAlumnos(array[0].id_curso, array[0].id_colegio).subscribe((data=>{
          let datos:any = data
          for(let i=0; i<datos.length; i++){
            this.alumnos.push(new Hijos(datos[i].id_alumno,datos[i].nombre, datos[i].apellidos))
          }
        }))

    this.createClase.obtenerClases(this.createClase.id_profesor)
      }))
    }))
  }
}
