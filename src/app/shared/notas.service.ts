import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Nota, Tipo } from '../models/nota';
import { Notas } from '../models/notas';
import { Hijos } from '../models/hijos';


@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private url:string = "http://localhost:3019"
  public notas:Nota[]
  public notas1:Notas[]
  public nota: Hijos[]
  public longitud:number
  constructor(private http:HttpClient) { 
    this.notas = []
    this.notas1 = []
    this.nota = []
    this.longitud = 0
  }

  obtenerAlummnos(id:number){
    return this.http.get(this.url + "/notasalumnos/" + id)
  }

  publicarNotas(notas:Nota){
    return this.http.post(this.url + "/notas", notas)
  }

  obtenerNotas(id_clase:number){
    this.notas1.splice(0, this.longitud)
    return this.http.get(this.url + "/notas/" + id_clase).subscribe((data=>{
      console.log(data);
      let datos:any = data
      this.longitud = datos.length
      for(let i=0; i<datos.length; i++){
        if(datos[i].tipo_calificacion == "examen"){
          this.notas1.push(new Notas(new Date(datos[i].fecha).toDateString(), datos[i].media, Tipo.examen))
        }else{
          this.notas1.push(new Notas(new Date(datos[i].fecha).toDateString(), datos[i].media, Tipo.trabajo))
        }
      }
      console.log(this.notas1);
      
    }))
  }

  editarNotas(fecha:string, tipo:Tipo, id_clase:number){
    return this.http.post(this.url + "/alumnos/examen", {"fecha":fecha, "tipo":tipo, "id_clase":id_clase})
  }

  cambiarNota(nota:number, id_nota:number){
    return this.http.put(this.url+"/notas", {"nota":nota, "id_nota":id_nota})
  }

  filtrar(id_clase:number, notamin:number, notamax:number, tipo:Tipo){
    return this.http.get(this.url + "/filtrar/" + id_clase + "/" + notamin + "/" + notamax + "/" + tipo)
  }

  filtrarNotasAlumno(id_alumno:number, notamax:number, notamin:number, tipo:string, id_asignatura:number){
    return this.http.get(this.url + "/filtrar/notas/alumnos/" + id_alumno + "/" + notamax +"/" + notamin +"/"+ tipo +"/" + id_asignatura)
  }

  obtenerNotasAlumnos(id_alumno:number){
    this.nota.splice(0,this.longitud)
    return this.http.get(this.url + "/notas/alumnos/" + id_alumno).subscribe((data=>{
      console.log(data);
      let array:any = data
      this.longitud = array.length
      for(let i=0; i<array.length; i++){
        this.nota.push(new Hijos(array[i].id_alumno, array[i].nombre, array[i].apellidos, array[i].nota, array[i].id_nota, new Date(array[i].fecha).toDateString(), array[i].nombre, array[i].id_asignatura, array[i].tipo_calificacion))
      }
      console.log(this.nota);
    }))
  }
}

