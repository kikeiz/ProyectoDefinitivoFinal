import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comportamiento, TipoComportamiento } from '../models/comportamiento';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class ComportamientoService {
  private url:string = "http://localhost:3019"
  public alumnos:Alumno[]
  public number:number

  constructor(private http:HttpClient) { 
    this.alumnos = []
    this.number = 0
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

  seleccionarComportamiento(id_alumno:number, tipo_comportamiento:TipoComportamiento){
    return this.http.get(this.url + "/comportamiento/" + id_alumno + "/" + tipo_comportamiento)
  }

  modificarComportamiento(id_comportamiento:number, nota:number){
    return this.http.put(this.url + "/modificar/comportamiento", {"id_comportamiento":id_comportamiento, "nota":nota})
  }
}
