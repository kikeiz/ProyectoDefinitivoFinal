import { Component, OnInit } from '@angular/core';
import { Colegios } from 'src/app/models/colegios';
import { Cursos } from 'src/app/models/cursos';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed:boolean

  constructor(public service: LoginService, public serviceAñadirAlumno:AñadirAlumnoService) { 
    this.isCollapsed = true
  }

  ngOnInit(): void {
  }

  colapsar(){
    this.isCollapsed = false
  }

  removeMain(valor:boolean){
    if(valor==true){
      this.service.home(null)
    }else{
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
}

