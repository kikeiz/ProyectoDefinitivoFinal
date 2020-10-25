import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Comunications, Envia, TipoMensaje, Valor } from 'src/app/models/comunications';
import {Hijos} from 'src/app/models/hijos'
import { AsistenciaService } from 'src/app/shared/asistencia.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { ComportamientoService } from 'src/app/shared/comportamiento.service';
import { MensajesService } from 'src/app/shared/mensajes.service';

@Component({
  selector: 'app-asistencia-profesor',
  templateUrl: './asistencia-profesor.component.html',
  styleUrls: ['./asistencia-profesor.component.css']
})
export class AsistenciaProfesorComponent implements OnInit {
  public asiste: boolean
  public mostrar: boolean
  public alumnos: Alumno[]
  public faltan: number[]
  public asisten: number[]
  public fecha:Date
  public porcentajes:Asistencia[]
  public faltaAsistencia: Asistencia[]
  constructor(public comportamientoService:ComportamientoService, public asistenciaService:AsistenciaService, public añadirClaseService:AñadirClaseService, public mensajeService:MensajesService) {
    this.asiste = false
    this.mostrar = false
    this.alumnos = this.comportamientoService.alumnos
    this.faltan = []
    this.asisten = []
    this.porcentajes = this.asistenciaService.porcentajes
    this.faltaAsistencia = []
   }

  ngOnInit(): void {
  }

  pasarLista(){
    this.asiste = true
  }

  chequeado(index:number, isChecked:boolean){
    if(!isChecked){
      this.faltan.push(index)
      console.log(this.faltan);
    }else{
      let valor = this.faltan.indexOf(index)
      this.faltan.splice(valor, 1)
      console.log(this.faltan);
    }
  }

  hanido(){
    this.asisten = []
    for(let i = 0; i<this.alumnos.length; i++){
      this.asisten.push(this.alumnos[i].id_alumno)
    }
    for(let j =0; j<this.faltan.length; j++){
      this.asisten.splice(this.asisten.indexOf(this.faltan[j]),1)
    }
    console.log(this.asisten);
    
  }
  

  enviar(){
    this.asiste = false
    this.hanido()
    for(let i = 0; i<this.asisten.length; i++){
      this.asistenciaService.pasarLista(new Asistencia(true, this.fecha, this.asisten[i], this.añadirClaseService.id_clase, true)).subscribe((data=>{
        console.log(data);
      }))
    }
    for(let j=0; j<this.faltan.length; j++){
      this.asistenciaService.pasarLista(new Asistencia(false, this.fecha, this.faltan[j], this.añadirClaseService.id_clase, false)).subscribe((data=>{
        console.log(data);
      }))
      this.mensajeService.enviarMensaje(new Comunications("Su hijo no ha acudido a clase el día" + " " + this.fecha, TipoMensaje.asistencia, this.fecha, Valor.negativo, this.añadirClaseService.id_clase, this.faltan[j], Envia.profesor)).subscribe((data=>{
        console.log(data);
      }))
    }
  }

  formatDate(date:string) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  mostrarAsistencia(i:number){
    this.faltaAsistencia = []
    this.mostrar = true
    this.asistenciaService.faltasDia(this.añadirClaseService.id_clase, this.formatDate(this.porcentajes[i].fecha1)).subscribe((data=>{
      let array:any = data
      console.log(array);
      for(let i =0; i<array.length; i++){
        this.faltaAsistencia.push(new Asistencia(false, null, array[i].id_alumno, null, array[i].justificada, null, null, array[i].nombre, array[i].apellidos))
      }
      console.log(this.faltaAsistencia);
    }))
  }

  cerrar(){
    this.mostrar = false
  }
  

}
