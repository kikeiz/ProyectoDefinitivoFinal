import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Comunications, Envia, TipoMensaje } from 'src/app/models/comunications';
import { Tipo } from 'src/app/models/nota';
import { AsistenciaService } from 'src/app/shared/asistencia.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { ComportamientoService } from 'src/app/shared/comportamiento.service';
import { MensajesService } from 'src/app/shared/mensajes.service';

@Component({
  selector: 'app-mensajeria-profesor',
  templateUrl: './mensajeria-profesor.component.html',
  styleUrls: ['./mensajeria-profesor.component.css']
})
export class MensajeriaProfesorComponent implements OnInit {
  public mensaje: Comunications
  public mensajes:Comunications[]
  public mostrar:boolean
  public mensajeFinal:string
  public filtro:boolean
  public alumnos: Alumno[]
  constructor(public mensajeService:MensajesService, public comportamientoService:ComportamientoService, public añadirClaseService: AñadirClaseService, public asistenciaService:AsistenciaService) { 
    this.mostrar = false
    this.mensajes = this.mensajeService.mensajesProfes
    this.filtro = false
    this.alumnos = this.comportamientoService.alumnos
  }

  ngOnInit(): void {
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

  desfiltrar(){
    if(this.filtro == false){
      this.filtro = true
    }else{
      this.filtro = false
    }
  }

  filtrar(idd:number){
    console.log(idd);
    this.mensajes = []
    this.mensajeService.filtrarProfes(this.añadirClaseService.id_clase, idd).subscribe((data=>{
      let array:any = data
      console.log(array);
      for(let i=0; i<array.length; i++){
        this.mensajes.push(new Comunications(array[i].contenido, TipoMensaje.asistencia, null, null, null, array[i].id_alumno, Envia.profesor, array[i].id_mensaje, null, array[i].nombre, array[i].apellidos, new Date(array[i].fecha).toDateString()))
      }
      console.log(this.mensajes);
    }))
  }
  mostrarMensaje(index:number){
    this.mostrar = true
    this.mensaje = this.mensajes[index]
  }

  aceptarJustificante(id_alumno:number, id_clase:number, fecha:string, justificada:boolean){
    // console.log(id_alumno, id_clase, fecha, justificada);
    this.asistenciaService.aceptarJustificante(id_clase, id_alumno, this.formatDate(fecha), justificada).subscribe((data=>{
      console.log(data);
    }))
  }

  borrar(index:number){
    this.mensajeService.borrarMensaje(this.mensajes[index].id_mensaje)
    this.mensajes.splice(index, 1)
  }

  cerrar(){
    this.mostrar = false
  }
}
