import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Colegios } from 'src/app/models/colegios';
import { Cursos } from 'src/app/models/cursos';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';

@Component({
  selector: 'app-aniadir-alumno',
  templateUrl: './aniadir-alumno.component.html',
  styleUrls: ['./aniadir-alumno.component.css']
})
export class AniadirAlumnoComponent implements OnInit {
  public colegios:Colegios[]
  public cursos:Cursos[]
  constructor(public service:AñadirAlumnoService) {
    this.colegios = this.service.colegios
    this.cursos = this.service.cursos
  }

  ngOnInit(): void {
  }

  aniadirAlumno(data:any){
    console.log(data);
    let alumno = new Alumno(data.nombre, data.apellidos, data.colegio, Number(this.service.id_padre), Number(data.curso))
    this.service.añadirAlumno(alumno).subscribe((data=>{
      console.log(data);
    }))
    
  }
 
  

}
