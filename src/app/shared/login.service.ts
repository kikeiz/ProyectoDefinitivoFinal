import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login: boolean
  public navPadres: boolean
  constructor() { 
    this.login = false
    this.navPadres = false
  }

  entrar(){
    this.login = true
  }

  navbar(data:string){
    if(data == 'padres'){
      this.navPadres = true
    }else{
      this.navPadres = false
    }
  }
}
