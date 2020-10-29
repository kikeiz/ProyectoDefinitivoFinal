import { Component, OnInit} from '@angular/core';
import { TickOptions } from 'chart.js';
import { Asignaturas } from 'src/app/models/asignaturas';
import { Hijos } from 'src/app/models/hijos';
import { Nota } from 'src/app/models/nota';
import {Tipo} from 'src/app/models/nota'
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { NotasService } from 'src/app/shared/notas.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-notas-padre',
  templateUrl: './notas-padre.component.html',
  styleUrls: ['./notas-padre.component.css']
})
export class NotasPadreComponent implements OnInit {
  public rojo:boolean
  public options: boolean
  public notas: Nota []
  public nota:Hijos[]
  public asignaturas: Asignaturas[]
  public notamedia: number
  public notamedia1:string 
  public mostrarmodal:boolean
  constructor(public notaService:NotasService, public añadirClaseService:AñadirClaseService, public añadirAlumnoService:AñadirAlumnoService, private modal:NgbModal) { 
    this.options = false
    this.notas = [new Nota(new Date(), 5, Tipo.examen, 2, 5, 2)] 
    this.nota = this.notaService.nota
    this.asignaturas = this.añadirClaseService.asignaturas
    this.mostrarmodal = false
    this.notamedia = 0
    this.notamedia1 = ""
    this.rojo = false
  }

  ngOnInit(): void {
  }

  opciones(){
    if(this.options==true){
      this.options = false
    }else{
      this.options = true
    }
  }

  filter(data:any){
    if(data.tipoDeCalificacion == "todos" && data.estadoNota == "todos" && data.asignatura == "todos"){
      this.rojo = false
    }else{
      this.rojo = true
    }
    this.nota = []
    this.options = false
    if(data.estadoNota == "suspenso"){
      this.notaService.filtrarNotasAlumno(this.añadirAlumnoService.id_alumno, 4.9, 0.1, data.tipoDeCalificacion, data.asignatura).subscribe((data=>{
        let array:any = data
        for(let i=0; i<array.length; i++){
          this.nota.push(new Hijos(array[i].id_alumno, array[i].alumno, array[i].apellidos, array[i].calificacion, array[i].id_nota, new Date(array[i].fecha).toDateString(), array[i].asignatura, array[i].id_asignaturas))
        }
        console.log(this.nota);
      }))
    }else{
      this.notaService.filtrarNotasAlumno(this.añadirAlumnoService.id_alumno, 10, 5, data.tipoDeCalificacion, data.asignatura).subscribe((data=>{
        let array:any = data
        for(let i=0; i<array.length; i++){
        this.nota.push(new Hijos(array[i].id_alumno, array[i].alumno, array[i].apellidos, array[i].calificacion, array[i].id_nota, new Date(array[i].fecha).toDateString(), array[i].asignatura, array[i].id_asignaturas))
        }
        console.log(this.nota);
      }))
    }
  }

  calcularMedia(contenido){
    let media:number = 0
    for(let i=0; i<this.nota.length; i++){
      media += this.nota[i].nota
    }
    this.notamedia = media/this.nota.length
    this.notamedia1 = this.notamedia.toFixed(2)
    this.modal.open(contenido, {size: "sm"})
  }


  cerrarModal(){
  }
}
