import { Hijos } from './hijos'

export class Asistencia {
    public asistencia:boolean
    public fecha: string
    public nombre: string
    public apellido: string
    public asignatura: string

    constructor(asistencia?:boolean, fecha?:string, nombre?:string, apellido?:string, asignatura?:string){
        this.asistencia = asistencia 
        this.fecha = fecha
        this.nombre= nombre
        this.apellido = apellido
        this.asignatura = asignatura
    }
}
