import { HtmlAstPath, HtmlTagDefinition } from '@angular/compiler';

export class Comunications {
    public icono:string;
    public mensaje:string;
    public tipo: string;
    public fecha: string;
    public positivo:boolean;
    public asignatura:string;
    public alumno: string

    constructor(icono?, mensaje?:string, tipo?:string, fecha?:string, positivo?:boolean, asignatura?:string, alumno?:string){
        this.icono = icono
        this.mensaje = mensaje
        this.tipo = tipo
        this.fecha = fecha
        this.positivo = positivo
        this.asignatura = asignatura
        this.alumno = alumno
    }
}
