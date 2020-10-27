import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Cursos} from 'src/app/models/cursos'
import {Clase} from 'src/app/models/clase'
import {Colegios} from 'src/app/models/colegios'
import {Asignaturas} from 'src/app/models/asignaturas'
import { from } from 'rxjs';
import { Hijos } from '../models/hijos';

@Injectable({
  providedIn: 'root'
})
export class AñadirClaseService {
  public id_profesor:number
  public asignaturas:Asignaturas[]
  public cursos:Cursos[]
  public colegio:Colegios[]
  public misClases:Clase[]
  public id_clase:number
  public id_clase_insertada:number
  public id_colegio:number
  public id_curso:number
  public nombre_clase:string
  public number: number
  private url:string = "http://localhost:3019"

  constructor(private http: HttpClient) {
    this.id_profesor = null
    this.id_clase = null
    this.id_colegio = null
    this.id_curso = null
    this.asignaturas = []
    this.cursos = [] 
    this.colegio = []
    this.misClases = []
    this.nombre_clase = "Ninguna Seleccionada"
    this.id_clase_insertada = 0
    this.number = 0
  }

  id(id_profesor:number){
    this.id_profesor = id_profesor
    console.log(this.id_profesor); 
  }

  idClase(id_clase:number, id_colegio:number, id_curso:number){
    this.id_clase = id_clase
    this.id_colegio = id_colegio
    this.id_curso = id_curso
  }

  cambiarNombre(nombre:string){
    this.nombre_clase = nombre
  }
  obtenerColegio(){
     return this.http.get(this.url+ "/colegio")
  }
  obtenerAsignaturas(){
     return this.http.get(this.url+ "/asignaturas")
 }

  obtenerasignaturas(){
  return this.http.get(this.url+ "/asignaturas").subscribe((data=>{
    let array:any = data
    for(let i =0; i<array.length; i++){
      this.asignaturas.push(new Asignaturas(array[i].id_asignatura, array[i].nombre))
    }
    console.log(this.asignaturas);
    
  }))
  }

  obtenerCursos(){
   return this.http.get(this.url+ "/cursos")
  }

 aniadirClases(newClass:Clase){
   return this.http.post(this.url + "/aniadirclase",newClass);
 }

 obtenerClases(idd:number){
   this.misClases.splice(0, this.number)
   return this.http.get(this.url + "/misclases/" + idd).subscribe((data=>{
     let array:any = data   
     this.number = array.length
     for(let i=0; i<array.length; i++){
      this.misClases.push(new Clase(array[i].nombre_clase, array[i].id_colegio, idd, array[i].id_asignatura, array[i].id_curso, array[i].id_clase))
     }
   }))
 }

 getClase(id:number){
   return this.http.get(this.url + '/clases/' + id)
 }

 getAlumnos(id:number, Id:number){
  return this.http.get(this.url + '/alumnos/' + id + '/' + Id)
 }

 alumnosClase(id_alumno:number, id_clase:number){
    return this.http.post(this.url + "/alumnos", {"id_clase":id_clase, "id_alumno":id_alumno})  
 }
}
