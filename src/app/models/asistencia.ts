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
    public id_asistencia:number
    public asignatura:string
    public totales: number
    public no_justificadas: number
    public justificadas:number
    public porcentaje_asistencia:number
    public porcentaje_justificadas:number
    public porcentaje_nojustificadas:number

    constructor(asiste?:boolean, fecha?:Date, id_alumno?:number, id_clase?:number, justificada?:boolean, asistencias?:number, fecha1?:string, nombre?:string, apellidos?:string, id_asistencia?:number, asignatura?:string, totales?:number, justificadas?: number, no_justificadas?:number, porcentaje_asistencia?:number, porcentaje_justificadas?:number, porcentaje_nojustificadas?:number){
        this.asiste = asiste
        this.fecha = fecha
        this.id_alumno = id_alumno
        this.id_clase = id_clase
        this.justificada = justificada
        this.asistencias = asistencias
        this.fecha1 = fecha1
        this.nombre = nombre
        this.apellidos = apellidos
        this.id_asistencia = id_asistencia
        this.asignatura = asignatura
        this.totales = totales
        this.justificadas = justificadas
        this.no_justificadas = no_justificadas
        this.porcentaje_asistencia = porcentaje_asistencia
        this.porcentaje_justificadas = porcentaje_justificadas
        this.porcentaje_nojustificadas = porcentaje_nojustificadas
    }
}
