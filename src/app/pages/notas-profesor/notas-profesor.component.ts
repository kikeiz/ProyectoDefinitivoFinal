import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Alumno } from 'src/app/models/alumno';
import { Comunications, Envia, TipoMensaje, Valor } from 'src/app/models/comunications';
import { Hijos } from 'src/app/models/hijos';
import { Nota, Tipo } from 'src/app/models/nota';
import { Notas } from 'src/app/models/notas';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { MensajesService } from 'src/app/shared/mensajes.service';
import { NotasService } from 'src/app/shared/notas.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-notas-profesor',
  templateUrl: './notas-profesor.component.html',
  styleUrls: ['./notas-profesor.component.css']
})
export class NotasProfesorComponent implements OnInit {
  public rojo:boolean
  public mostrarF1: boolean
  public mostrarF2: boolean
  public mostrarF3: boolean
  public mostrarF4: boolean[]
  public mostrarF5: boolean
  public nota:Nota
  public notas:Nota[]
  public notasmedias:Notas[]
  public alumnos:Alumno[]
  public cambioAlumnos:Hijos[]
  public media:number
  
 
  constructor(public notaservice:NotasService, public anadirClaseService:AñadirClaseService, public serviceMensaje:MensajesService, private modal:NgbModal) { 
    this.rojo = false
    this.mostrarF1 = false
    this.mostrarF2 = false
    this.mostrarF3 = false
    this.mostrarF4 = []
    this.mostrarF5 = false
    this.nota = new Nota()
    this.notas = []
    this.alumnos = []
    this.notasmedias = this.notaservice.notas1
    this.cambioAlumnos = []
    this.media = 0
  }

  ngOnInit(): void {
  }
  
  anadirNota(){
    this.alumnos = []
    this.notas = []
    this.mostrarF1 = true
    this.notaservice.obtenerAlummnos(this.anadirClaseService.id_clase).subscribe((data=>{
      let datos:any = data
      this.alumnos = []
      for(let i=0; i<datos.length;i++){
        this.alumnos.push(new Alumno(datos[i].nombre, datos[i].apellidos, datos[i].id_colegio, datos[i].id_padre, datos[i].id_curso, datos[i].id_alumno))
        this.notas.push(new Nota(new Date(), 0, null, this.anadirClaseService.id_profesor, this.anadirClaseService.id_clase, datos[i].id_alumno))
      }
      console.log(this.alumnos);
    }))
  }

  insertarNotas(datos:any){
    this.mostrarF2 = true
    if(datos.tipoDeCalificacion == 'examen'){
      this.nota.tipo = Tipo.examen
      let fecha = new Date(datos.fecha)
      this.nota.fecha = fecha
      for(let i=0; i<this.notas.length; i++){
        this.notas[i].fecha = this.nota.fecha
        this.notas[i].tipo = Tipo.examen
      }      
    }else{
      this.nota.tipo = Tipo.trabajo
      let fecha = new Date(datos.fecha)
      this.nota.fecha = fecha
      for(let i=0; i<this.notas.length; i++){
        this.notas[i].fecha = this.nota.fecha
        this.notas[i].tipo = Tipo.trabajo
      }    
    }
    
  }

  actualizar(contenido){
    this.mostrarF1 = false
    this.mostrarF2 = false
    console.log(this.notas);
    for(let i=0; i<this.notas.length; i++){
      this.media += this.notas[i].nota
      this.notaservice.publicarNotas(this.notas[i]).subscribe((data=>{
        console.log(data);
      }))
    }
    this.notaservice.obtenerNotas(this.anadirClaseService.id_clase)
    this.modal.open(contenido, {size: "sm"})
    setTimeout(()=>{
      this.modal.dismissAll()
    }, 2000)

    for(let i=0; i<this.notas.length; i++){
      if(this.notas[i].nota>=5){
        this.serviceMensaje.enviarMensaje(new Comunications("Su hijo ha obtenido una calificación de" + this.notas[i].nota + "en el" + this.notas[i].tipo + "realizado en fecha: " + this.notas[i].fecha, TipoMensaje.calificacion, this.notas[i].fecha, Valor.positivo, this.notas[i].id_clase, this.notas[i].id_alumno, Envia.profesor)).subscribe((data=>{
          console.log(data)
        }))
      
      }else{
        this.serviceMensaje.enviarMensaje(new Comunications("Su hijo ha obtenido una calificación de" + this.notas[i].nota + "en el" + this.notas[i].tipo + "realizado en fecha: " + this.notas[i].fecha, TipoMensaje.calificacion, this.notas[i].fecha, Valor.negativo, this.notas[i].id_clase, this.notas[i].id_alumno, Envia.profesor)).subscribe((data=>{
          console.log(data)
        }))
      }
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

  editar(i:number){
    this.mostrarF3 = true
    this.cambioAlumnos = []
    this.notaservice.editarNotas(this.formatDate(this.notasmedias[i].fecha), this.notasmedias[i].tipo, this.anadirClaseService.id_clase).subscribe((data=>{
      console.log(data);
      let array:any = data
      for(let i=0; i<array.length; i++){
        this.cambioAlumnos.push(new Hijos(array[i].id_alumno, array[i].nombre, array[i].apellidos, array[i].nota, array[i].id_nota))
        this.mostrarF4.push(false)
      }
      console.log(this.cambioAlumnos);
    }))
  }

  cerrar(){
    this.mostrarF1 = false
    this.mostrarF2 = false
    this.mostrarF3 = false
  }

  cambiar(i:number){
   this.mostrarF4[i] = true
  }

  modificar(i:number){
    this.mostrarF4[i] = false
    console.log(this.cambioAlumnos[i].nota);
    console.log(this.cambioAlumnos[i].id_nota);
    this.notaservice.cambiarNota(this.cambioAlumnos[i].nota, this.cambioAlumnos[i].id_nota).subscribe((data=>{
      console.log(data);
    }))
    this.notaservice.obtenerNotas(this.anadirClaseService.id_clase)

  }

  opciones(){
    if(this.mostrarF5 == true){
      this.mostrarF5 = false
    }else{
      this.mostrarF5 = true
    }
  }

  filter(datos:any){
    if(datos.estadoNota == "todos" && datos.tipoDeCalificacion == "todos"){
      this.rojo = false
    }else{
      this.rojo = true
    }
    this.notasmedias = []
    if(datos.estadoNota == "suspenso"){
      this.notaservice.filtrar(this.anadirClaseService.id_clase, 0.1, 4.9, datos.tipoDeCalificacion).subscribe((data=>{
        let array:any = data
        console.log(array);
        for(let i=0; i<array.length; i++){
          if(array[i].tipo == "trabajo"){
            this.notasmedias.push(new Notas(new Date(array[i].fecha1).toDateString(), array[i].media, Tipo.trabajo))
          }else{
            this.notasmedias.push(new Notas(new Date(array[i].fecha1).toDateString(), array[i].media, Tipo.examen))
          }
        }
      }))
    }else if(datos.estadoNota == "aprobado"){
      this.notaservice.filtrar(this.anadirClaseService.id_clase, 5, 10, datos.tipoDeCalificacion).subscribe((data=>{
        let array:any = data
        for(let i=0; i<array.length; i++){
          if(array[i].tipo == "trabajo"){
            this.notasmedias.push(new Notas(new Date(array[i].fecha1).toDateString(), array[i].media, Tipo.trabajo))
          }else{
            this.notasmedias.push(new Notas(new Date(array[i].fecha1).toDateString(), array[i].media, Tipo.examen))
          }
        }
      }))
    }else{
      this.notaservice.filtrar(this.anadirClaseService.id_clase, 0.1, 10, datos.tipoDeCalificacion).subscribe((data=>{
        let array:any = data
        for(let i=0; i<array.length; i++){
          if(array[i].tipo == "trabajo"){
            this.notasmedias.push(new Notas(new Date(array[i].fecha1).toDateString(), array[i].media, Tipo.trabajo))
          }else{
            this.notasmedias.push(new Notas(new Date(array[i].fecha1).toDateString(), array[i].media, Tipo.examen))
          }
        }
      }))
    }
    this.mostrarF5 = false
    console.log(datos);
  }


  
}
