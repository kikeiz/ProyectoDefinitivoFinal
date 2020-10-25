import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/models/asistencia';
import { Comunications, Envia, TipoMensaje, Valor } from 'src/app/models/comunications';
import { AsistenciaService } from 'src/app/shared/asistencia.service';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { MensajesService } from 'src/app/shared/mensajes.service';

@Component({
  selector: 'app-asistencia-padre',
  templateUrl: './asistencia-padre.component.html',
  styleUrls: ['./asistencia-padre.component.css']
})
export class AsistenciaPadreComponent implements OnInit {
  public faltas: Asistencia[]
  public ids:number[]
  constructor(public serviceAsistencia:AsistenciaService, public mensajeService:MensajesService, public añadirAlumnoService:AñadirAlumnoService) {
    this.faltas = this.serviceAsistencia.faltas
    this.ids = []
   }

  ngOnInit(): void {
  }

  chequeado(index:number, isChecked:boolean){
    if(isChecked){
      this.ids.push(index)
      console.log(this.ids);
    }else{
      let valor = this.ids.indexOf(index)
      this.ids.splice(valor, 1)
      console.log(this.ids);
    }
  }

  justificar(){
    for(let i=0; i<this.ids.length; i++){
      this.serviceAsistencia.justificar(this.ids[i]).subscribe((data=>{
        console.log(data);
        this.serviceAsistencia.datosFalta(this.ids[i]).subscribe((datos=>{
          let array:any = datos
          this.mensajeService.enviarMensaje(new Comunications("Justifico la falta de mi hijo " + array[0].nombre + " " + array[0].apellidos, TipoMensaje.asistencia, array[0].fecha, Valor.positivo, array[0].id_clase, array[0].id_alumno, Envia.padre)).subscribe((data=>{
            console.log(data);
          }))
        }))
      }))
    }
    this.serviceAsistencia.faltasAlumno(this.añadirAlumnoService.id_alumno)
  }
}
