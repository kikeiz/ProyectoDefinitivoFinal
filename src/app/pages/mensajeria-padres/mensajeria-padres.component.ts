import { Component, OnInit } from '@angular/core';
import { Comunications, Valor } from 'src/app/models/comunications';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { MensajesService } from 'src/app/shared/mensajes.service';

@Component({
  selector: 'app-mensajeria-padres',
  templateUrl: './mensajeria-padres.component.html',
  styleUrls: ['./mensajeria-padres.component.css']
})
export class MensajeriaPadresComponent implements OnInit {
  public mensajes:Comunications[]
  public mensaje: Comunications
  public mostrar:boolean
  public filtro:boolean
  constructor(public mensajeService:MensajesService, public añadirAlumnoService:AñadirAlumnoService) { 
    this.mensajes = this.mensajeService.mensajesPadres
    this.mostrar = false
    this.mensaje = null
    this.filtro = false
  }

  ngOnInit(): void {
  }

  mostrarMensaje(index:number){
    this.mostrar = true
    this.mensaje = this.mensajes[index]
  }

  filtrar(value:any){
    this.mensajes.splice(0, this.mensajes.length)
    console.log(value);
    this.mensajeService.filtrarPadres(this.añadirAlumnoService.id_alumno, value).subscribe((data=>{
      let array:any = data
      console.log(array);
      for(let i=0; array.length; i++){
        this.mensajes.push(new Comunications(array[i].contenido, array[i].tipo, null, array[i].valor, null, null, null, array[i].id_mensaje, null, null, null, new Date(array[i].fecha).toDateString()))
      }
      console.log(data);
    }))
  }

  desfiltrar(){
    if(this.filtro == false){
      this.filtro = true
    }else{
      this.filtro = false
    }
  }

  cerrar(){
    this.mostrar = false
  }

  borrar(index:number){
    this.mensajeService.borrarMensaje(this.mensajes[index].id_mensaje)
    this.mensajes.splice(index, 1)
  }

}
