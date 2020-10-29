import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Comunications, Envia, TipoMensaje } from 'src/app/models/comunications';
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
  constructor(public mensajeService:MensajesService, public comportamientoService:ComportamientoService, public añadirClaseService: AñadirClaseService) { 
    this.mostrar = false
    this.mensajes = this.mensajeService.mensajesProfes
    this.filtro = false
    this.alumnos = this.comportamientoService.alumnos
  }

  ngOnInit(): void {
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

  borrar(index:number){
    this.mensajeService.borrarMensaje(this.mensajes[index].id_mensaje)
    this.mensajes.splice(index, 1)
  }

  cerrar(){
    this.mostrar = false
  }
}
