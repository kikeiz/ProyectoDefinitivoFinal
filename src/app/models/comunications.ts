import { HtmlAstPath, HtmlTagDefinition } from '@angular/compiler';
import { Clase } from './clase';

export enum TipoMensaje{
    asistencia = "asistencia",
    puntualidad = "puntualidad",
    atencion = "atencion",
    calificacion = "calificaciones",
    participacion = "participacion",
    deberes = "deberes"
}
export enum Valor{
    positivo = "positivo",
    negativo = "negativo"
}

export enum Envia{
    padre = "padre",
    profesor = "profesor"
}

export class Comunications {
    public contenido:string;
    public tipo: TipoMensaje;
    public fecha: Date;
    public valor :Valor;
    public id_alumno: number
    public id_clase:number
    public envia:Envia
    public id_mensaje:number
    public asignatura:string
    public nombre_alumno:string
    public apellidos:string
    public fecha1:string

    constructor(contenido?:string, tipo?:TipoMensaje, fecha?:Date, valor?:Valor, id_clase?:number, id_alumno?:number, envia?:Envia, id_mensaje?:number, asignatura?:string, nombre_alumno?:string, apellidos?:string, fecha1?:string){
        this.contenido = contenido
        this.tipo = tipo
        this.fecha = fecha
        this.valor = valor
        this.id_clase = id_clase
        this.id_alumno = id_alumno
        this.envia = envia
        this.id_mensaje = id_mensaje
        this.asignatura = asignatura
        this.nombre_alumno = nombre_alumno
        this.apellidos = apellidos
        this.fecha1 = fecha1
    }
}
