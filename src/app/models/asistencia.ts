import { Hijos } from './hijos'

export class Asistencia {
    public asiste:boolean
    public fecha: Date
    public id_alumno: number
    public id_clase: number
    public justificada: boolean
    public asistencias: number
    public fecha1:string
    public nombre:string
    public apellidos:string

    constructor(asiste?:boolean, fecha?:Date, id_alumno?:number, id_clase?:number, justificada?:boolean, asistencias?:number, fecha1?:string, nombre?:string, apellidos?:string){
        this.asiste = asiste
        this.fecha = fecha
        this.id_alumno = id_alumno
        this.id_clase = id_clase
        this.justificada = justificada
        this.asistencias = asistencias
        this.fecha1 = fecha1
        this.nombre = nombre
        this.apellidos = apellidos
    }
}
