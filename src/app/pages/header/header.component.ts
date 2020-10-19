import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service'; 
import { Clase} from 'src/app/models/clase'
import { Colegios } from 'src/app/models/colegios'
import { Asignaturas } from 'src/app/models/asignaturas';
import { Cursos } from 'src/app/models/cursos';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed:boolean
  public clase:Clase[] =[];

  constructor(public service: LoginService, public obtenerClase: AñadirClaseService) { 
    this.isCollapsed = true
  }

  ngOnInit(): void {
  }

  colapsar(){
    this.isCollapsed = false
  }

  removeMain(valor:boolean){
    if (valor==true){
      this.service.home(null)
      }else{
      this.service.home(null)
      this.obtenerClase.obtenerColegio().subscribe((data => {
      console.log(data);
      let array:any=data
      for (let i=0; i<array.length;i++){
        this.obtenerClase.colegio.push(new Colegios(array[i].id_colegio, array[i].nombre, array[i].ciudad))
      }
      }))
      this.obtenerClase.obtenerAsignaturas().subscribe((data =>{
        console.log(data);
        let array:any=data
        for (let i=0; i<array.length;i++){
        this.obtenerClase.asignaturas.push(new Asignaturas(array[i].id_asignatura,array[i].nombre))   
        }
      }))
      }
      this.obtenerClase.obtenerCursos().subscribe((data =>{
        console.log(data);
        let array:any=data
        for (let i=0; i<array.length;i++){
          this.obtenerClase.cursos.push(new Cursos(array[i].id_curso, array[i].nombre))
        }
      }))
    
  
    }
}