import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asistencia } from '../models/asistencia';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private url:string = "http://localhost:3019"
  public porcentajes:Asistencia[]
  public number:number
  constructor(private http: HttpClient) { 
    this.porcentajes = []
    this.number = 0
  }

  pasarLista(asistencia:Asistencia){
    return this.http.post(this.url + "/asistencia", asistencia)
  }

  porcentaje(id_clase:number){
    this.porcentajes.splice(0,this.number)
    console.log(id_clase);
    return this.http.get(this.url + "/porcentaje/" + id_clase).subscribe((data=>{
      let array:any = data
      this.number = array.length
      for(let i=0; i<array.length; i++){
        this.porcentajes.push(new Asistencia(null, null, null, null, null, array[i].asistencias, new Date(array[i].fecha).toDateString()))
      }
      console.log(this.porcentajes);
      
    }))
  }

  faltasDia(id_clase:number, fecha:string){
    return this.http.get(this.url + "/faltas/" + id_clase + "/" + fecha)
  }
  
}
