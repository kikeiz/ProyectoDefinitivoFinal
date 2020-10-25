import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import {PerfilProfesor} from'../models/perfil-profesor';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

    private url:string = "http://localhost:3019"
    public profesor:PerfilProfesor

  constructor(private http: HttpClient) {
    this.profesor = new PerfilProfesor()
   }


  putUsuario(usuario_actualizado:PerfilProfesor){
    console.log(usuario_actualizado)
    return this.http.put(this.url + "/editarProfesor", usuario_actualizado)
  }
  getProfesor(id_profesor:number){
    return this.http.get(this.url+"/obtenerProfesor/"+ id_profesor).subscribe((data=>{
      this.profesor.nombre = data[0].nombre
      this.profesor.apellidos = data[0].apellidos
      this.profesor.descripcion = data[0].descripcion
      this.profesor.email = data[0].email
      this.profesor.username = data[0].username
      this.profesor.password = data[0].password
      this.profesor.foto = data[0].foto
           // this.profesor=new PerfilProfesor(data[0].nombre,data[0].apellidos,data[0].descripcion,data[0].email,data[0].username,data[0].password,data[0].foto)
      console.log(this.profesor)
    }))
    
  }
}

