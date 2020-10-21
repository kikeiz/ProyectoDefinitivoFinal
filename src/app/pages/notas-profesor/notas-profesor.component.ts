import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Nota, Tipo } from 'src/app/models/nota';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { NotasService } from 'src/app/shared/notas.service';


@Component({
  selector: 'app-notas-profesor',
  templateUrl: './notas-profesor.component.html',
  styleUrls: ['./notas-profesor.component.css']
})
export class NotasProfesorComponent implements OnInit {
  public mostrarF1: boolean
  public mostrarF2: boolean
  public mostrarF3: boolean
  public mostrarF4: boolean
  public mostrarF5: boolean
  public nota:Nota
  public notas:Nota[]
  public alumnos:Alumno[]
  constructor(public notaservice:NotasService, public anadirClaseService:AñadirClaseService) { 
    this.mostrarF1 = false
    this.mostrarF2 = false
    this.mostrarF3 = false
    this.mostrarF4 = false
    this.mostrarF5 = false
    this.nota = new Nota()
    this.notas = []
    this.alumnos = []
  }

  ngOnInit(): void {
  }
  anadirNota(){
    this.mostrarF1 = true
    this.notaservice.obtenerAlummnos(this.anadirClaseService.id_clase).subscribe((data=>{
      let datos:any = data
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

  actualizar(){
    this.mostrarF1 = false
    this.mostrarF2 = false
    console.log(this.notas);
    
  }

  editar(){
    this.mostrarF3 = true
  }

  cerrar(){
    this.mostrarF1 = false
    this.mostrarF2 = false
    this.mostrarF3 = false
  }

  cambiar(){
   this.mostrarF4 = true
  }

  modificar(){
    this.mostrarF4 = false
  }

  opciones(){
    if(this.mostrarF5 == true){
      this.mostrarF5 = false
    }else{
      this.mostrarF5 = true
    }
  }

  filter(datos:any){
    this.mostrarF5 = false
    //como comparar fechas
    let fecha = new Date()   
    // let fecha2 = new Date(datos.fecha) 
    // console.log(fecha2);
    console.log(datos.estadoNota);
  }

  
}
