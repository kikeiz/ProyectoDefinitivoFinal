import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Cursos} from 'src/app/models/cursos'
import {Clase} from 'src/app/models/clase'
import {Colegios} from 'src/app/models/colegios'
import {Asignaturas} from 'src/app/models/asignaturas'

import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AñadirClaseService {
  public id_profesor:number
  public asignaturas:Asignaturas[]
  public cursos:Cursos[]
  public colegio:Colegios[]
  private url:string = "http://localhost:3019"

  constructor(private http: HttpClient) {
    this.id_profesor = null
    this.asignaturas = []
    this.cursos = [] 
    this.colegio = []
  }

  id(id:number){
    this.id_profesor = id
    console.log(this.id_profesor); 
  }

  obtenerColegio(){
     return this.http.get(this.url+ "/colegio")
  }
  obtenerAsignaturas(){
     return this.http.get(this.url+ "/asignaturas")
 }

  obtenerCursos(){
   return this.http.get(this.url+ "/cursos")
  }

 aniadirClases(newClass:Clase){
   return this.http.post(this.url + "/aniadirclase",newClass );
 }
}
