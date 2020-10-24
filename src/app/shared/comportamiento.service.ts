import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comportamiento } from '../models/comportamiento';

@Injectable({
  providedIn: 'root'
})
export class ComportamientoService {
  private url:string = "http://localhost:3019"

  constructor(private http:HttpClient) { }

  insertarComportamientos(comportamiento:Comportamiento){
    return this.http.post(this.url + "/comportamiento", comportamiento)
  }
}
