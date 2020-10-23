import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comunications } from '../models/comunications';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private url:string = "http://localhost:3019"
  constructor(private http:HttpClient) { }

  enviarMensaje(mensaje:Comunications){
    return this.http.post(this.url + "/mensaje", mensaje)
  }
}
