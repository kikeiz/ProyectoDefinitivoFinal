import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Nota, Tipo } from '../models/nota';
import { Notas } from '../models/notas';


@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private url:string = "http://localhost:3019"
  public notas:Nota[]
  public notas1:Notas[]
  constructor(private http:HttpClient) { 
    this.notas = []
    this.notas1 = []
  }

  obtenerAlummnos(id:number){
    return this.http.get(this.url + "/notasalumnos/" + id)
  }

  publicarNotas(notas:Nota){
    return this.http.post(this.url + "/notas", notas)
  }

  obtenerNotas(id_clase:number){
    this.notas1 = []
    return this.http.get(this.url + "/notas/" + id_clase).subscribe((data=>{
      console.log(data);
      let datos:any = data
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
}

