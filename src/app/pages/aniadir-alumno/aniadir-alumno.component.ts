import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Colegios } from 'src/app/models/colegios';
import { Cursos } from 'src/app/models/cursos';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { HomeService } from 'src/app/shared/home.service';


@Component({
  selector: 'app-aniadir-alumno',
  templateUrl: './aniadir-alumno.component.html',
  styleUrls: ['./aniadir-alumno.component.css']
})
export class AniadirAlumnoComponent implements OnInit {
  public colegios:Colegios[]
  public cursos:Cursos[]
  constructor(public service:AñadirAlumnoService, private modal:NgbModal, public homeService: HomeService) {
    this.colegios = this.service.colegios
    this.cursos = this.service.cursos
  }

  ngOnInit(): void {
  }

  mostrarModal(content){
    this.modal.open(content, {size: "sm"})
    setTimeout(()=>{
      this.modal.dismissAll()
    }, 2000)
  }

  aniadirAlumno(data:any, contenido){
    console.log(data);
    let alumno = new Alumno(data.nombre, data.apellidos, Number(data.colegio), Number(this.service.id_padre), Number(data.curso))
    this.service.añadirAlumno(alumno).subscribe((data=>{
      console.log(data);
      this.service.obtenerAlumnos(this.service.id_padre)
    }))
    this.mostrarModal(contenido)
    this.homeService.getPerfilAlumno(this.service.id_padre)
    
  }
 
  

}
