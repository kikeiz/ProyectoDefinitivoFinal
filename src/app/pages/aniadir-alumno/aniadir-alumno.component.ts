import { Component, OnInit } from '@angular/core';
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
    console.log(this.colegios);
    console.log(this.cursos);
    
    
  }
 
  

}
