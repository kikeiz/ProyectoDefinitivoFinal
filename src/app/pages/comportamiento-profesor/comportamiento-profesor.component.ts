import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { Alumno } from 'src/app/models/alumno';
import { Comportamiento, TipoComportamiento } from 'src/app/models/comportamiento';
import { Comunications, Envia, TipoMensaje, Valor } from 'src/app/models/comunications';
import { Tipo } from 'src/app/models/nota';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { ComportamientoService } from 'src/app/shared/comportamiento.service';
import { MensajesService } from 'src/app/shared/mensajes.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-comportamiento-profesor',
  templateUrl: './comportamiento-profesor.component.html',
  styleUrls: ['./comportamiento-profesor.component.css']
})
export class ComportamientoProfesorComponent implements OnInit {
  public splice:number
  public date:Date
  public id_alumno:number
  public puntualidad: boolean
  public deberes: boolean
  public atencion:boolean
  public comportamiento:boolean
  public rojo:boolean
  public verde:boolean
  public tablaResumen:boolean
  public nombre:string
  public mostrarF4:boolean
  public mensaje:boolean
  public alumnos: Alumno[]
  public nombreAlumno: string
  public comportamientosAlumno: Comportamiento[]
  public mediaComportamiento: Comportamiento[]
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
    xAxes: [{}], 
    yAxes: [{ 
      id: 'y-axis-10',
    position: 'left'}] 
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Participacion', 'Atencion', 'Deberes', 'Puntualidad'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
 

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0], label: 'Clase' }
  ];
  constructor(public comportamientoService:ComportamientoService, public añadirClaseService:AñadirClaseService, public mensajeService:MensajesService, private modal:NgbModal){
    this.puntualidad = false
    this.deberes = false
    this.atencion = false
    this.comportamiento = false
    this.rojo = false
    this.verde = false
    this.tablaResumen = false
    this.mostrarF4 = false
    this.mensaje = false
    this.alumnos = this.comportamientoService.alumnos
    // this.nombreAlumno = this.alumnos[0].nombre + " " + this.alumnos[0].apellidos
    this.comportamientosAlumno = []
    this.mediaComportamiento = []
    // this.barChartData[0].label = this.alumnos[0].nombre + " " + this.alumnos[0].apellidos
    this.id_alumno = 0
    this.splice = 0
   }

   @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective


  ngOnInit(): void {
  }

  resaltar(valor:number){
    if(valor == 0){
      this.puntualidad = true;
      this.atencion = false;
      this.comportamiento = false;
      this.deberes = false
    }else if(valor == 1){
      this.atencion = true;
      this.comportamiento = false;
      this.deberes = false;
      this.puntualidad = false;
    }else if(valor ==2){
      this.deberes = true;
      this.atencion = false;
      this.comportamiento = false;
      this.puntualidad = false;
    }else{
      this.comportamiento = true;
      this.deberes = false;
      this.atencion = false;
      this.puntualidad = false;
    }
  }

  color(color:number){
    if(color == 0){
      this.rojo = true
      this.verde = false
    }else{
      this.verde = true
      this.rojo = false
    }
  }

  comportamientosAlum(id_alumno:number, id_clase:number){
    this.comportamientosAlumno.splice(0, this.splice)
    this.comportamientoService.comportamientosAlumno(id_alumno, id_clase).subscribe((data=>{
      let array:any = data
      this.splice = array.length
      console.log(array);
      for(let j=0; j<array.length; j++){
        if(array[j].tipo_comportamiento == "atencion"){
          this.comportamientosAlumno.push(new Comportamiento(TipoComportamiento.atencion, array[j].nota, array[j].id_alumno, array[j].id_clase))
          this.barChartData[0].data[1] = this.comportamientosAlumno[j].nota
        }else if(array[j].tipo_comportamiento == "deberes"){
          this.comportamientosAlumno.push(new Comportamiento(TipoComportamiento.deberes, array[j].nota, array[j].id_alumno, array[j].id_clase))
          this.barChartData[0].data[2] = this.comportamientosAlumno[j].nota
        }else if(array[j].tipo_comportamiento == "participacion"){
          this.comportamientosAlumno.push(new Comportamiento(TipoComportamiento.participacion, array[j].nota, array[j].id_alumno, array[j].id_clase))
          this.barChartData[0].data[0] = this.comportamientosAlumno[j].nota
        }else{
          this.comportamientosAlumno.push(new Comportamiento(TipoComportamiento.puntualidad, array[j].nota, array[j].id_alumno, array[j].id_clase))
          this.barChartData[0].data[3] = this.comportamientosAlumno[j].nota
        }
      }
    }))
  }

  cambioAlumno(id:any){
    this.id_alumno = id
    let i= 0
    let condicion = false
    while (i<this.alumnos.length && condicion == false){
      if(id == this.alumnos[i].id_alumno){
        this.nombreAlumno = this.alumnos[i].nombre + " " + this.alumnos[i].apellidos
        this.barChartData[0].label = this.nombreAlumno
        this.comportamientosAlum(this.alumnos[i].id_alumno, this.añadirClaseService.id_clase)
        condicion = true
      }else{
        i++
      }
    }
  }

  fecha(fecha:Date){
    console.log(fecha);
  }
  sumarComportamiento(tipo:TipoComportamiento, dati:any){
    this.comportamientoService.seleccionarComportamiento(this.id_alumno, tipo, this.añadirClaseService.id_clase).subscribe((data=>{
      let array:any = data
      console.log(array);
      this.comportamientoService.modificarComportamiento(array[0].id_comportamiento, (array[0].nota + dati.nota)).subscribe((data1=>{
        this.comportamientosAlum(this.id_alumno, this.añadirClaseService.id_clase)
        console.log(data1);
      }))
    }))
  }

  restarComportamiento(tipo:TipoComportamiento, dati:any){
    this.comportamientoService.seleccionarComportamiento(this.id_alumno, tipo, this.añadirClaseService.id_clase).subscribe((data=>{
      let array:any = data
      console.log(array);
      this.comportamientoService.modificarComportamiento(array[0].id_comportamiento, (array[0].nota-dati.nota)).subscribe((data1=>{
        this.comportamientosAlum(this.id_alumno, this.añadirClaseService.id_clase)
        console.log(data1);
      }))
    }))
  }

  enviarMensaje(contenido:string, tipo:TipoMensaje, fecha:Date, valor:Valor, id_clase:number, id_alumno:number, envia:Envia ){
    let mensaje:Comunications = new Comunications(contenido, tipo, fecha, valor, id_clase, id_alumno, envia)
    this.mensajeService.enviarMensaje(mensaje).subscribe((data=>{
      console.log(data);
    }))
  }

  mostrarModal(content){
    this.modal.open(content, {size: "sm"})
    setTimeout(()=>{
      this.modal.dismissAll()
    }, 2000)
  }


  actualizar(datos:any, contenido){
    if(!datos.mensaje || datos.mensaje == ""){
      if(this.comportamiento == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.participacion, datos)
        this.mostrarModal(contenido)
      }else if(this.comportamiento == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.participacion, datos)
        this.mostrarModal(contenido)

      }else if(this.deberes == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.deberes, datos)
        this.mostrarModal(contenido)

      }else if(this.deberes == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.deberes, datos)
        this.mostrarModal(contenido)

      }else if(this.puntualidad == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.puntualidad, datos)
        this.mostrarModal(contenido)

      }else if(this.puntualidad == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.puntualidad, datos)
        this.mostrarModal(contenido)

      }else if(this.atencion == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.atencion, datos)
        this.mostrarModal(contenido)

      }else if(this.atencion == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.atencion, datos)
        this.mostrarModal(contenido)

      }else{
        console.log("Es necesario seleccionar un comportamiento y asociarle un valor para poder continuar!");
      }
    }else{
      if(this.comportamiento == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.participacion, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.participacion, this.date, Valor.negativo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else if(this.comportamiento == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.participacion, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.participacion, this.date, Valor.positivo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else if(this.deberes == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.deberes, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.deberes, this.date, Valor.negativo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else if(this.deberes == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.deberes, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.deberes, this.date, Valor.positivo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else if(this.puntualidad == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.puntualidad, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.puntualidad, this.date, Valor.negativo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else if(this.puntualidad == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.puntualidad, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.puntualidad, this.date, Valor.positivo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else if(this.atencion == true && this.rojo == true){
        this.restarComportamiento(TipoComportamiento.atencion, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.atencion, this.date, Valor.negativo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else if(this.atencion == true && this.verde == true){
        this.sumarComportamiento(TipoComportamiento.atencion, datos)
        this.enviarMensaje(datos.mensaje, TipoMensaje.atencion, this.date, Valor.positivo, this.añadirClaseService.id_clase, this.id_alumno, Envia.profesor)
        this.mostrarModal(contenido)

      }else{
        console.log("Es necesario seleccionar un comportamiento y asociarle un valor para poder continuar!");
      }
    }
    
    this.rojo = false
    this.verde = false
    this.comportamiento = false
    this.atencion = false
    this.deberes = false
    this.puntualidad = false
    this.mensaje = false
    console.log(this.date); 
  }


  mostrar(){
    this.tablaResumen = true
    this.comportamientoService.mediaClase(this.añadirClaseService.id_clase).subscribe((data=>{
      let array:any = data
      console.log(array);
      for(let i=0; i<array.length; i++){
        if(array[i].tipo_comportamiento == "puntualidad"){
          this.mediaComportamiento.push(new Comportamiento(TipoComportamiento.puntualidad, array[i].nota_media))
          this.barChartData[1].data[3] = array[i].nota_media
        }else if(array[i].tipo_comportamiento == "atencion"){
          this.mediaComportamiento.push(new Comportamiento(TipoComportamiento.atencion, array[i].nota_media))
          this.barChartData[1].data[1] = array[i].nota_media
        }else if(array[i].tipo_comportamiento == "participacion"){
          this.mediaComportamiento.push(new Comportamiento(TipoComportamiento.participacion, array[i].nota_media))
          this.barChartData[1].data[0] = array[i].nota_media
        }else{
          this.mediaComportamiento.push(new Comportamiento(TipoComportamiento.deberes, array[i].nota_media))
          this.barChartData[1].data[2] = array[i].nota_media
        }
      }
      console.log(this.barChartData[1]);
      console.log(this.mediaComportamiento);
    }))
  }

  cambiar(){
    this.mostrarF4 = true
   }
 
   modificar(){
     this.mostrarF4 = false
   }

   terminar(){
     this.tablaResumen = false
   }

   envimes(){
     if(this.mensaje == false){
      this.mensaje = true
     }else{
       this.mensaje = false
     }
   }
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}
