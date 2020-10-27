import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asistencia } from '../models/asistencia';
import { AssertNotNull } from '@angular/compiler';
import { AñadirAlumnoService } from './añadir-alumno.service';
import { AñadirClaseService } from './añadir-clase.service';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private url:string = "http://localhost:3019"
  public porcentajes:Asistencia[]
  public number:number
  public numero:number
  public numerodetalle:number
  public faltas:Asistencia[]
  public detalle:Asistencia[]
  constructor(private http: HttpClient, public añadirClaseService:AñadirClaseService) { 
    this.porcentajes = []
    this.faltas = []
    this.number = 0
    this.numero = 0
    this.detalle = []
    this.numerodetalle = 0
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

  justificar(id_asistencia:number){
    return this.http.put(this.url + "/justificar", {"id_asistencia": id_asistencia})
  }

  datosFalta(id_asistencia:number){
    return this.http.get(this.url + "/datos/falta/" + id_asistencia)
  }

  detalleAsistencia(id_clase:number){
    return this.http.get(this.url + "/detalle/" + id_clase).subscribe((data=>{
      this.detalle.splice(0, this.numerodetalle)
      let array:any = data
      console.log(array);
      this.numerodetalle = array.length
      for(let i=0; i<array.length; i++){
        this.detalle.push(new Asistencia(null, null, array[i].id_alumno, this.añadirClaseService.id_clase, null, null, null, array[i].nombre, array[i].apellidos, null, null, array[i].asistencias, array[i].justificada, array[i].no_justificadas, array[i].porcentaje_asiste, array[i].porcentaje_justificada, array[i].porcentaje_nojustificada))
      }
      console.log(this.detalle);
    }))
  }
}
