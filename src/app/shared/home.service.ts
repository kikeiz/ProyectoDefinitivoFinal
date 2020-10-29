import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AñadirAlumnoService } from './añadir-alumno.service';
import {Alumno} from 'src/app/models/alumno'
import { Cursos} from 'src/app/models/cursos'
import {PerfilProfesor} from'../models/perfil-profesor';
import {PerfilPadre} from '../models/perfil-padre'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url:string = "http://localhost:3019"
  public alumnos: Alumno[]

  constructor(private http: HttpClient) { 
    this.alumnos = []
  }

  getPerfilAlumno(id_padre:number){    
    return this.http.get(this.url + "/todos/" + id_padre).subscribe((data) =>{
      // let array:any = data
      // this.alumnos = array.length
      // for(let i=0; i<array.length; i++){
      //   this.alumnos.push(new Alumno(null,null, null, null, null, array[i].alumnos)) //no se creo?
      // }
    })
  }
}
