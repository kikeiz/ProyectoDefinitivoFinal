import { Component, OnInit } from '@angular/core';
import { Colegios } from 'src/app/models/colegios';
import { Cursos } from 'src/app/models/cursos';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { LoginService } from 'src/app/shared/login.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service'; 
import { Clase} from 'src/app/models/clase'
import { Asignaturas } from 'src/app/models/asignaturas';
import { PerfilService } from 'src/app/shared/perfil.service';
import { Alumno } from 'src/app/models/alumno';
import { NotasService } from 'src/app/shared/notas.service';
import { Router } from '@angular/router';
import { ComportamientoService } from 'src/app/shared/comportamiento.service';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/shared/asistencia.service';
import { MensajesService } from 'src/app/shared/mensajes.service';
import { HomeService } from 'src/app/shared/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed:boolean
  public clases:Clase[];
  public alumnos:Alumno[]
  public nombre_alumno:string

  constructor(public service: LoginService, public serviceAñadirAlumno:AñadirAlumnoService, public serviceAñadirClase:AñadirClaseService, public serviceNotas:NotasService, private router: Router, public comportamientoService:ComportamientoService, public asistenciaService:AsistenciaService, public mensajeService:MensajesService, public perfilService:PerfilService, public LoginService:LoginService, public HomeService:HomeService) { 
    this.isCollapsed = false
    this.clases = this.serviceAñadirClase.misClases
    this.alumnos = null
    this.nombre_alumno = "Ninguna Seleccionada"
  }

  ngOnInit(): void {
  }



  logout(){
    this.LoginService.home(null)
    this.LoginService.salir()
  }

  colapsar(){
    this.isCollapsed = false
  }
  
  perfil(es_padre: boolean){
    this.service.home(null)
    console.log(es_padre)
    if(es_padre == true){
      this.perfilService.getPadre(this.serviceAñadirAlumno.id_padre)

    } else {
      this.perfilService.getProfesor(this.serviceAñadirClase.id_profesor)

    }
    
  }



  obtenerNotas(){
    this.service.home(null)
    console.log(this.serviceAñadirClase.id_clase);
    this.serviceNotas.obtenerNotas(this.serviceAñadirClase.id_clase)
  }

  mostrarCalificaciones(){
    this.service.home(null)
    this.serviceAñadirClase.obtenerasignaturas()
    this.serviceNotas.obtenerNotasAlumnos(this.serviceAñadirAlumno.id_alumno)
  }

  asistenciaFather(){
    this.service.home(null)
    this.asistenciaService.faltasAlumno(this.serviceAñadirAlumno.id_alumno)
  }

  comPadre(){
    this.service.home(null)
    this.comportamientoService.clasesXalumno(this.serviceAñadirAlumno.id_alumno)
  }

  mensajePadre(){
    this.service.home(null)
    this.mensajeService.obtenerMensajes(this.serviceAñadirAlumno.id_alumno, null)
  }

  asistenciaProfe(){
    this.service.home(null)
    this.asistenciaService.porcentaje(this.serviceAñadirClase.id_clase)
    this.asistenciaService.detalleAsistencia(this.serviceAñadirClase.id_clase)
  }

  comProfe(){
    this.service.home(null)
    this.comportamientoService.alumnosClase(this.serviceAñadirClase.id_clase)
  }

  mensajeProfe(){
    this.service.home(null)
    this.mensajeService.obtenerMensajes(null, this.serviceAñadirClase.id_clase)

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
    this.HomeService.cambiarNombre(this.clases[i].nombre_clase)
    this.serviceNotas.obtenerNotas(this.clases[i].id_clase)   
    this.comportamientoService.alumnosClase(this.clases[i].id_clase)
    this.asistenciaService.porcentaje(this.clases[i].id_clase)
    this.mensajeService.obtenerMensajes(null, this.clases[i].id_clase)
    this.asistenciaService.detalleAsistencia(this.clases[i].id_clase)
    
  }

  seleccionarAlumno(i:number){
    this.serviceAñadirAlumno.idAlumno(this.alumnos[i].id_alumno)
    this.HomeService.cambiarAlumno(this.alumnos[i].nombre + " " + this.alumnos[i].apellidos)
    this.serviceNotas.obtenerNotasAlumnos(this.alumnos[i].id_alumno)
    this.asistenciaService.faltasAlumno(this.alumnos[i].id_alumno)
    this.mensajeService.obtenerMensajes(this.alumnos[i].id_alumno, null)
    this.comportamientoService.clasesXalumno(this.alumnos[i].id_alumno)
  }

  traerAlumnos(){
    this.alumnos = this.serviceAñadirAlumno.alumnos
  }

  
}

