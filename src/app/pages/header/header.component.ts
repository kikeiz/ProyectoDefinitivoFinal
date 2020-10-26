import { Component, OnInit } from '@angular/core';
import { Colegios } from 'src/app/models/colegios';
import { Cursos } from 'src/app/models/cursos';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { LoginService } from 'src/app/shared/login.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service'; 
import { Clase} from 'src/app/models/clase'
import { Asignaturas } from 'src/app/models/asignaturas';
import { Alumno } from 'src/app/models/alumno';
import { NotasService } from 'src/app/shared/notas.service';
import { Router } from '@angular/router';
import { ComportamientoService } from 'src/app/shared/comportamiento.service';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/shared/asistencia.service';
import { MensajesService } from 'src/app/shared/mensajes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed:boolean
  public clases:Clase[];
  public alumnos:Alumno[]
  public nombre_clase:string
  public nombre_alumno:string

  constructor(public service: LoginService, public serviceAñadirAlumno:AñadirAlumnoService, public serviceAñadirClase:AñadirClaseService, public serviceNotas:NotasService, private router: Router, public comportamientoService:ComportamientoService, public asistenciaService:AsistenciaService, public mensajeService:MensajesService) { 
    this.isCollapsed = false
    this.clases = this.serviceAñadirClase.misClases
    this.alumnos = null
    this.nombre_clase = "Ninguna Seleccionada"
    this.nombre_alumno = "Ninguno Seleccionado"
  }

  ngOnInit(): void {
  }

  colapsar(){
    this.isCollapsed = false
  }

  obtenerNotas(){
    this.service.home(null)
    console.log(this.serviceAñadirClase.id_clase);
    this.serviceNotas.obtenerNotas(this.serviceAñadirClase.id_clase)
  }

  mostrarCalificaciones(){
    this.service.home(null)
    this.serviceAñadirClase.obtenerasignaturas()
  }

  removeMain(){
    this.service.home(null)
  }

  aniadirClase(){
      this.service.home(null)
      this.serviceAñadirClase.obtenerColegio().subscribe((data => {
      console.log(data);
      let array:any=data
        for (let i=0; i<array.length;i++){
          this.serviceAñadirClase.colegio.push(new Colegios(array[i].id_colegio, array[i].nombre, array[i].ciudad))
        }
      }))

      this.serviceAñadirClase.obtenerAsignaturas().subscribe((data =>{
        console.log(data);
        let array:any=data
        for (let i=0; i<array.length;i++){
        this.serviceAñadirClase.asignaturas.push(new Asignaturas(array[i].id_asignatura,array[i].nombre))   
        }
      }))
      
      this.serviceAñadirAlumno.obtenerCursos().subscribe((data =>{
        console.log(data);
        let array:any=data
        for (let i=0; i<array.length;i++){
          this.serviceAñadirClase.cursos.push(new Cursos(array[i].id_curso, array[i].nombre))
        }
      }))
    
  }

  aniadirAlumno(){
      this.service.home(null)
      this.serviceAñadirAlumno.obtenerColegios().subscribe((data =>{
        let array:any = data
        for(let i=0; i<array.length;i++){
          this.serviceAñadirAlumno.colegios.push(new Colegios(array[i].id_colegio, array[i].nombre, array[i].ciudad))
        }
      }))

      this.serviceAñadirAlumno.obtenerCursos().subscribe((data=>{
        let array:any = data
        for(let i=0; i<array.length;i++){
          this.serviceAñadirAlumno.cursos.push(new Cursos(array[i].id_curso,array[i].nombre))
        }
      })) 
  }


  seleccionarClase(i:number){
    this.serviceAñadirClase.idClase(this.clases[i].id_clase, this.clases[i].id_colegio, this.clases[i].id_curso)
    this.nombre_clase = this.clases[i].nombre_clase.toUpperCase()
    this.serviceNotas.obtenerNotas(this.clases[i].id_clase)   
    this.comportamientoService.alumnosClase(this.clases[i].id_clase)
    this.asistenciaService.porcentaje(this.clases[i].id_clase)
    this.mensajeService.obtenerMensajes(null, this.clases[i].id_clase)
    this.asistenciaService.detalleAsistencia(this.clases[i].id_clase)
    
  }

  seleccionarAlumno(i:number){
    this.serviceAñadirAlumno.idAlumno(this.alumnos[i].id_alumno)
    this.nombre_alumno = (this.alumnos[i].nombre + " " + this.alumnos[i].apellidos).toUpperCase()
    this.serviceNotas.obtenerNotasAlumnos(this.alumnos[i].id_alumno)
    this.asistenciaService.faltasAlumno(this.alumnos[i].id_alumno)
    this.mensajeService.obtenerMensajes(this.alumnos[i].id_alumno, null)
  }

  traerAlumnos(){
    this.alumnos = this.serviceAñadirAlumno.alumnos
  }
}

