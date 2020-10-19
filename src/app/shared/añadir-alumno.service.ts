import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AñadirAlumnoService {
  public id_alumno:number
  constructor() { }

  id(id:number){
    this.id_alumno = id
    console.log(this.id_alumno);
    
  }
}
