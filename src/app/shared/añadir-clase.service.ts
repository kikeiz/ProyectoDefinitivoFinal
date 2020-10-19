import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AñadirClaseService {
  public id_profesor:number
  constructor() { }

  id(id:number){
    this.id_profesor = id
    console.log(this.id_profesor); 
  }
}
