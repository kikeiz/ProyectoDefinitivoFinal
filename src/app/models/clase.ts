import { Hijos } from './hijos';

export class Clase {
    public nombre_clase:string;
    public id_colegio: number;
    public id_profesor:number;
    public id_asignatura:number;
    public id_curso:number;
    public id_clase:number;
    public asignatura:string

    constructor(nombre_clase?:string, id_colegio?:number, id_profesor?:number,id_asignatura?:number,id_curso?:number,id_clase?:number, asignatura?:string){
        this.nombre_clase = nombre_clase
        this.id_profesor = id_profesor
        this.id_colegio = id_colegio
        this.id_asignatura = id_asignatura
        this.id_curso = id_curso
        this.id_clase = id_clase
        this.asignatura = asignatura
    }
}
