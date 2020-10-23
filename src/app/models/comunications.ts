import { HtmlAstPath, HtmlTagDefinition } from '@angular/compiler';
import { Clase } from './clase';

export enum TipoMensaje{
    asistencia = "asistencia",
    puntualidad = "puntualidad",
    atencion = "atencion",
    calificacion = "calificacion",
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

    constructor(contenido?:string, tipo?:TipoMensaje, fecha?:Date, valor?:Valor, id_clase?:number, id_alumno?:number, envia?:Envia){
        this.contenido = contenido
        this.tipo = tipo
        this.fecha = fecha
        this.valor = valor
        this.id_clase = id_clase
        this.id_alumno = id_alumno
        this.envia = envia
    }
}
