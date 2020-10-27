
export enum TipoComportamiento{
    participacion = "participacion",
    atencion = "atencion",
    deberes = "deberes",
    puntualidad = "puntualidad"
}
export class Comportamiento {
    public id_comportamiento:number;
    public tipo_comportamiento: TipoComportamiento;
    public nota: number;
    public id_alumno: number;
    public id_clase: number;

    constructor(tipo_comportamiento: TipoComportamiento, nota:number, id_alumno?:number, id_clase?:number){
        this.tipo_comportamiento = tipo_comportamiento
        this.nota = nota
        this.id_alumno = id_alumno
        this.id_clase = id_clase
    }
}
