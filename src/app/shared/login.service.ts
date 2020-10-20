import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import {PerfilProfesor}  from 'src/app/models/perfil-profesor'
import {PerfilPadre} from 'src/app/models/perfil-padre'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login: boolean
  public navPadres: boolean
  public homePadre:boolean
  private url:string = "http://localhost:3019"
  constructor(private http: HttpClient) { 
    this.login = false
    this.navPadres = false
    this.homePadre = null
  }
  entrar(){
    this.login = true
    console.log(this.login)
  }

  navbar(data:string){
    if(data == 'padres'){
      this.navPadres = true
    }else{
      this.navPadres = false
    }
  }

  home(valor:boolean){
    if(valor == true){
      this.homePadre = true
    }else if(valor==false){
      this.homePadre = false
    }else{
      this.homePadre = null
    }
  }

  postPadre(user:User){
    return this.http.post(this.url +"/register/padre", user)

  }

  postProfe(user:User){
    return this.http.post(this.url +"/register/profesor", user)
  }

  loginPadre(user:User){
    console.log(user);
    return this.http.post(this.url + "/login/padre", user)
  }

  loginProfesor(user:User){
    console.log(user);
    return this.http.post(this.url + "/login/profesor", user)
  }

  editarPerfilPadre(newpadre:PerfilPadre){
    return this.http.put(this.url + "/editarPadre" ,newpadre)
  }

}
