import { HtmlAstPath, HtmlTagDefinition } from '@angular/compiler';

export class Comunications {
    public icono:string;
    public mensaje:string;
    public tipo: string;
    public fecha: string;
    public positivo:boolean

    constructor(icono?, mensaje?:string, tipo?:string, fecha?:string, positivo?:boolean){
        this.icono = icono;
        this.mensaje = mensaje
        this.tipo = tipo
        this.fecha = fecha
        this.positivo = positivo
    }
}
