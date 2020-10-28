import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comunications, Envia, TipoMensaje, Valor } from '../models/comunications';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  public mensajesPadres:Comunications[]
  public numeroPadres:number
  public mensajesProfes:Comunications[]
  public numeroProfes:number
  private url:string = "http://localhost:3019"
  constructor(private http:HttpClient) {
    this.mensajesPadres = []
    this.mensajesProfes = []
    this.numeroPadres = 0
    this.numeroProfes = 0
   }

  enviarMensaje(mensaje:Comunications){
    console.log(mensaje);
    return this.http.post(this.url + "/mensaje", mensaje)
  }

  comprobarMensajes(datos:any){
    for(let i=0; i<datos.length; i++){
      if(datos[i].tipo == "puntualidad" && datos[i].valor == "negativo"){
          this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.puntualidad, null, Valor.negativo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "puntualidad" && datos[i].valor == "positivo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.puntualidad, null, Valor.positivo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "deberes" && datos[i].valor == "positivo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.deberes, null, Valor.positivo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "deberes" && datos[i].valor == "negativo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.deberes, null, Valor.negativo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "atencion" && datos[i].valor == "positivo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.atencion, null, Valor.positivo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "atencion" && datos[i].valor == "negativo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.atencion, null, Valor.negativo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "asistencia" && datos[i].valor == "positivo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.asistencia, null, Valor.positivo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "asistencia" && datos[i].valor == "negativo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.asistencia, null, Valor.negativo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "participacion" && datos[i].valor == "positivo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.participacion, null, Valor.positivo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "participacion" && datos[i].valor == "negativo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.participacion, null, Valor.negativo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else if(datos[i].tipo == "calificaciones" && datos[i].valor == "positivo"){
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.calificacion, null, Valor.positivo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))

      }else{
        this.mensajesPadres.push(new Comunications(datos[i].contenido, TipoMensaje.calificacion, null, Valor.negativo, datos[i].id_clase, datos[i].id_alumno, Envia.profesor, datos[i].id_mensaje, datos[i].nombre, null, null, new Date(datos[i].fecha).toDateString()))
      }
    }
  }

  mensajePadres(id_al:number){
    this.mensajesPadres.splice(0, this.numeroPadres)
    return this.http.get(this.url + "/mensajes/" +  id_al).subscribe((data=>{
      let array:any = data
      this.numeroPadres = array.length
      this.comprobarMensajes(array)
      console.log(this.mensajesPadres);
    }))
  }

  borrarMensaje(id_mensaje:number){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}), body: {id:id_mensaje}};
    this.http.delete(this.url + "/mensaje", httpOptions).subscribe((data=>{
      console.log(data);
    }))
  }

  mensajeProfes(id_clas:number){
    this.mensajesProfes.splice(0, this.numeroProfes)
    return this.http.get(this.url + "/mensajes/clase/" + id_clas).subscribe((data=>{
      let array:any = data
      this.numeroProfes = array.length
      for(let i=0; i<array.length; i++){
        this.mensajesProfes.push(new Comunications(array[i].contenido, TipoMensaje.asistencia, null, Valor.positivo, array[i].id_clase, array[i].id_alumno, Envia.padre, array[i].id_mensaje, array[i].nombre, array[i].nombre_alumno, array[i].apellidos, new Date(array[i].fecha).toDateString()))
      }
      console.log(this.mensajesProfes);
    }))
  }

  obtenerMensajes(id_alumno:number, id_clase:number){
    if(id_alumno == null){
      this.mensajeProfes(id_clase)
      
    }else{
      this.mensajePadres(id_alumno)
      
    }
  }

  filtrarPadres(id_alumno:number, tipo:string){
    return this.http.get(this.url + "/filtro/mensajes/" + id_alumno + "/" + tipo)
  }
}
