export class Alumno {
    public nombre:string;
    public apellidos:string;
    public id_colegio:number;
    public id_padre:number;
    public id_curso:number;
    public id_alumno:number;
  

    constructor(nombre:string, apellidos:string, id_colegio:number, id_padre:number, id_curso:number,id_alumno?:number){
        this.nombre = nombre
        this.apellidos = apellidos
        this.id_colegio = id_colegio
        this.id_padre = id_padre
        this.id_curso = id_curso
        this.id_alumno = id_alumno
       

    }
}
