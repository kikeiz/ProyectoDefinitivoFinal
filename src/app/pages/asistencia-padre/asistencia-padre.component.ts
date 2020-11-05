import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/models/asistencia';
import { Comunications, Envia, TipoMensaje, Valor } from 'src/app/models/comunications';
import { AsistenciaService } from 'src/app/shared/asistencia.service';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { MensajesService } from 'src/app/shared/mensajes.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-asistencia-padre',
  templateUrl: './asistencia-padre.component.html',
  styleUrls: ['./asistencia-padre.component.css']
})
export class AsistenciaPadreComponent implements OnInit {
  public faltas: Asistencia[]
  public ids:number[]
  public mensaje:boolean
  constructor(public serviceAsistencia:AsistenciaService, public mensajeService:MensajesService, public añadirAlumnoService:AñadirAlumnoService, private modal:NgbModal) {
    this.faltas = this.serviceAsistencia.faltas
    this.ids = []
    this.mensaje = false
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


  chequeado(index:number, isChecked:boolean, i:number){
    if(isChecked){
      this.ids.push(index)
      console.log(this.ids);
    }else{
      let valor = this.ids.indexOf(index)
      this.ids.splice(valor, 1)
      console.log(this.ids);
    }
  }

  enviarMensaje(){
    this.mensaje = true
  }

  mostrarModal(content){
    this.modal.open(content, {size: "sm"})
    setTimeout(()=>{
      this.modal.dismissAll()
    }, 2000)
  }

  justificar(contenido, msn:string){
    this.mensaje = false
    for(let i=0; i<this.ids.length; i++){
      this.serviceAsistencia.justificar(this.ids[i]).subscribe((data=>{
        console.log(data);
        this.serviceAsistencia.datosFalta(this.ids[i]).subscribe((datos=>{
          let array:any = datos
          console.log(this.formatDate(new Date(array[0].fecha).toDateString()));
          this.mensajeService.enviarAsistencia(new Comunications(msn, TipoMensaje.asistencia, null, Valor.positivo, array[0].id_clase, array[0].id_alumno, Envia.padre, null, null, null, null, this.formatDate(new Date(array[0].fecha).toDateString()))).subscribe((data=>{
            console.log(data);
            let array:any = data
            this.mensajeService.mensajeAsistencia(array.insertId, this.ids[i]).subscribe((data=>{
              console.log(data);
            }))
          }))
        }))
      }))
    }
    setTimeout(()=>{
      this.serviceAsistencia.faltasAlumno(this.añadirAlumnoService.id_alumno)
    },2000)
    
    this.mostrarModal(contenido)
  }
}
