import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private url:string = "http://localhost:3019"

  constructor(private http:HttpClient) { 

  }

  obtenerAlummnos(id:number){
    return this.http.get(this.url + "/notasalumnos/" + id)
  }
}

