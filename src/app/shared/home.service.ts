import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AñadirAlumnoService } from './añadir-alumno.service';
import {Alumno} from 'src/app/models/alumno'
import { Cursos} from 'src/app/models/cursos'
import {PerfilProfesor} from'../models/perfil-profesor';
import {PerfilPadre} from '../models/perfil-padre'
import { FormArrayName } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  private url:string = "http://localhost:3019"
  public alumnos: any[]
  public asignaturas: string[]
  public numero: number
  public numero1:number
  public clases:any[]

  constructor(private http: HttpClient) { 
    this.alumnos = []
    this.asignaturas = []
    this.numero = 0
    this.numero1 = 0
    this.clases = []
  }



  getPerfilAlumno(id_padre:number){  
    this.alumnos.splice(0, this.numero)  
    this.http.get(this.url + "/todos/" + id_padre).subscribe((data) =>{
      let array:any = data
      this.numero = array.length
      for(let i=0; i<array.length; i++){
        let asignatur:string[] = []
        this.http.get(this.url + "/asignaturas/alumno/" + array[i].id_alumno).subscribe((datos=>{
          console.log(datos);
          let array2:any = datos
          for(let j=0; j<array2.length; j++){
            asignatur.push(array2[j].asignaturas)
          }
          this.alumnos.push({"nombre":array[i].nombre, "apellidos":array[i].apellidos, "id_alumno":array[i].id_alumno, "asignaturas":asignatur, "colegio":array[i].colegio, "curso":array[i].curso, "mostrar":false})
        }))
      }
    })
  }
  
  obtenerClases(id_profesor:number){
    this.clases.splice(0, this.numero1)
    this.http.get(this.url + "/clases/profesor/" + id_profesor).subscribe((data=>{
      console.log(data);
      let array:any = data
      this.numero1 = array.length
      for(let i=0; i<array.length; i++){
        let alumn:string[] = []
        this.http.get(this.url + "/alumnosxclase/" + array[i].id_clase).subscribe((datos=>{
          let array2:any = datos
          for(let j=0; j<array2.length; j++){
            alumn.push(array2[j].apellidos + ", " + array2[j].nombre)
          }
          this.clases.push({"id_clase": array[i].id_clase, "colegio": array[i].colegio, "curso": array[i].curso, "nombre_clase":array[i].nombre_clase, "alumnos":alumn, "asignatura":array[i].asignatura, "mostrar":false})
        }))
      }
    }))
  }

  log(){
    console.log(this.clases);
    
  }

}
