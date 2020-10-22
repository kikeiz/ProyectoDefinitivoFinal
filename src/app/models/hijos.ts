export class Hijos {
    public id_hijo:number
    public nombre:string
    public apellido: string
    public id_padre: number
    public nota:number
    public id_nota:number

    constructor(id_hijo?:number, nombre?:string, apellido?:string, nota?:number, id_nota?:number){
        this.id_hijo = id_hijo
        this.nombre = nombre
        this.apellido = apellido
        this.nota = nota
        this.id_nota = id_nota
    }
}
