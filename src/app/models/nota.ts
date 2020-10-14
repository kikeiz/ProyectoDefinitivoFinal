export enum Tipo{
    trabajo = "trabajo",
    examen = "examen"
}

export class Nota {
    public id:number
    public nota:number
    public asignatura:string
    public fecha: string
    public tipo: Tipo

    constructor(nota:number, fecha:string, tipo:Tipo, asignatura:string){
        this.nota = nota
        this.fecha = fecha
        this.tipo = tipo
        this.asignatura = asignatura
    }
}
