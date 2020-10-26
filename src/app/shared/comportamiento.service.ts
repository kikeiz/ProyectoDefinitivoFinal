import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comportamiento, TipoComportamiento } from '../models/comportamiento';
import { Alumno } from '../models/alumno';
import { Clase } from '../models/clase';

@Injectable({
  providedIn: 'root'
})
export class ComportamientoService {
  private url:string = "http://localhost:3019"
  public alumnos:Alumno[]
  public number:number
  public clases:Clase[]
  public clasesNumber:number

  constructor(private http:HttpClient) { 
    this.alumnos = []
    this.number = 0
    this.clases = []
    this.clasesNumber = 0
  }

  alumnosClase(id_clase:number){
    this.alumnos.splice(0, this.number)
    this.http.get(this.url + "/alumno/clase/" + id_clase).subscribe((data=>{
      let array:any = data
      this.number = array.length
      for(let i=0; i<array.length; i++){
        this.alumnos.push(new Alumno(array[i].nombre, array[i].apellidos, null, null, null, array[i].id_alumno))
      }
      console.log(this.alumnos);
    }))
  }

  insertarComportamientos(comportamiento:Comportamiento){
    return this.http.post(this.url + "/comportamiento", comportamiento)
  }

  seleccionarComportamiento(id_alumno:number, tipo_comportamiento:TipoComportamiento, id_clase:number){
    return this.http.get(this.url + "/bhviour/" + id_clase + "/" + tipo_comportamiento + "/" + id_alumno)
  }

  modificarComportamiento(id_comportamiento:number, nota:number){
    return this.http.put(this.url + "/modificar/comportamiento", {"id_comportamiento":id_comportamiento, "nota":nota})
  }

  mediaClase(id_clase:number){
      return this.http.get(this.url + "/behaviour/class/" + id_clase)
  }

  comportamientosAlumno(id_alumno:number, id_clase:number){
    return this.http.get(this.url + "/comportamientos/alumno/" + id_alumno + "/" + id_clase)
  }

  clasesXalumno(id_alumno:number){
    this.clases.splice(0, this.clasesNumber)
    return this.http.get(this.url + "/clases/alumno/" + id_alumno).subscribe((data=>{
      let array:any = data
      this.clasesNumber = array.length
      for(let i =0; i<array.length; i++){
        this.clases.push(new Clase(null, null, null, null, null, array[i].id_clases, array[i].nombre))
      }
      console.log(this.clases);
    }))
  }
}
