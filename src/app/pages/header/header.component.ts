import { Component, OnInit } from '@angular/core';
import { Colegios } from 'src/app/models/colegios';
import { Cursos } from 'src/app/models/cursos';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { LoginService } from 'src/app/shared/login.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service'; 
import { Clase} from 'src/app/models/clase'
import { Asignaturas } from 'src/app/models/asignaturas';
import { PerfilService } from 'src/app/shared/perfil.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed:boolean
  public clase:Clase[] =[];

  constructor(public service: LoginService, public serviceAñadirAlumno:AñadirAlumnoService, public serviceAñadirClase:AñadirClaseService,public perfilService:PerfilService) { 
    this.isCollapsed = true
  }

  ngOnInit(): void {
  }

  colapsar(){
    this.isCollapsed = false
  }
  perfil(){
    this.service.home(null)
    this.perfilService.getProfesor(this.serviceAñadirClase.id_profesor)
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
}

