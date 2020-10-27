import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Colegios } from '../models/colegios';
import { Cursos } from '../models/cursos';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AñadirAlumnoService {
  public id_padre:number
  public id_alumno:number
  public colegios:Colegios[]
  public cursos: Cursos[]
  public alumnos:Alumno[]
  public nombre_alumno:string[]
 
  private url:string = "http://localhost:3019"
  constructor(private http:HttpClient) {
    this.colegios = []
    this.cursos = []
    this.alumnos = []
    this.nombre_alumno = []
  
   }

  id(id:number){
    this.id_padre = id
    console.log(this.id_padre);
  }

  idAlumno(id:number){
    this.id_alumno = id
    console.log(this.id_alumno);
  }

  obtenerColegios(){
    return this.http.get(this.url + "/colegio")
  }
  
  obtenerCursos(){
    return  this.http.get(this.url + "/cursos")
  }

  añadirAlumno(alumno:Alumno){
    return this.http.post(this.url + "/aniadiralumno", alumno)
  }

  obtenerAlumnos(id_padre:number){
    return this.http.get(this.url + "/alumnos/" + id_padre).subscribe((data=>{
      let array:any = data
      this.alumnos = []
      for(let i=0; i<array.length; i++){
        this.alumnos.push(new Alumno(array[i].nombre, array[i].apellidos, array[i].id_colegio, array[i].id_padre, array[i].id_curso, array[i].id_alumno))
      }
    }))
  }
}
