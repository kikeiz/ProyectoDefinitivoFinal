import { Tipo } from './nota';

export class Notas {
    public fecha:string;
    public nota:number;
    public tipo:Tipo;

    constructor(fecha:string, nota:number, tipo:Tipo){
        this.fecha = fecha
        this.nota = nota
        this.tipo = tipo
    }
}
