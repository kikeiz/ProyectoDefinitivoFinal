export enum Tipo{
    trabajo = "trabajo",
    examen = "examen"
}

export class Nota {
    public id_nota:number
    public nota:number
    public fecha: Date
    public tipo: Tipo
    public id_profesor:number
    public id_alumno:number
    public id_clase:number

    constructor(fecha?:Date, nota?:number, tipo?:Tipo, id_profesor?:number, id_clase?:number, id_alumno?:number){
        this.fecha = fecha
        this.nota = nota
        this.tipo = tipo
        this.id_profesor = id_profesor
        this.id_clase = id_clase
        this.id_alumno = id_alumno
    }
}
