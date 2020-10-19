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
  public colegios:Colegios[]
  public cursos: Cursos[]
  private url:string = "http://localhost:3019"
  constructor(private http:HttpClient) {
    this.colegios = []
    this.cursos = []
   }

  id(id:number){
    this.id_padre = id
    console.log(this.id_padre);
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
}
