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
  public numero:number
  public faltas:Asistencia[]
  constructor(private http: HttpClient) { 
    this.porcentajes = []
    this.faltas = []
    this.number = 0
    this.numero = 0
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
  
  faltasAlumno(id_alumno:number){
    this.faltas.splice(0, this.numero)
    return this.http.get(this.url + "/faltasAlumno/" + id_alumno).subscribe((data=>{
      let array:any = data
      this.numero = array.length
      for(let i =0; i<array.length; i++){
        this.faltas.push(new Asistencia(false, null, id_alumno, array[i].id_clase, false, null, new Date(array[i].fecha).toDateString(), null, null, array[i].id_asistencia, array[i].nombre))
      }
      console.log(this.faltas);
    }))
  }
}
