import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import {PerfilPadre} from 'src/app/models/perfil-padre'
import {Alumno} from'src/app/models/alumno';
import { PerfilService } from 'src/app/shared/perfil.service';

  import { from } from 'rxjs';
import { HomeService } from 'src/app/shared/home.service';
import { Asignaturas } from 'src/app/models/asignaturas';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
@Component({
  selector: 'app-home-padre',
  templateUrl: './home-padre.component.html',
  styleUrls: ['./home-padre.component.css'],
  providers:[NgbCarouselConfig]
})
export class HomePadreComponent implements OnInit {
 
  public alumnos:any[]
  public asignaturas:string[]
  
  
  constructor(public servicePerfil:PerfilService,public serviceAñadirClase:AñadirClaseService, public service:HomeService, public añadirAlumnoService:AñadirAlumnoService) {
      this.alumnos =this.service.alumnos
  }

  mostrarAsignaturas(index:number){
    if(this.alumnos[index].mostrar == true){
      this.alumnos[index].mostrar = false
    }else{
      this.alumnos[index].mostrar = true
    }
  }

  nombre(index:number){
    console.log(this.alumnos[index].id_alumno);
    
    this.service.cambiarAlumno(this.alumnos[index].nombre + " " + this.alumnos[index].apellidos)
    this.añadirAlumnoService.idAlumno(this.alumnos[index].id_alumno)
  }

  ngOnInit(): void {
  }

}