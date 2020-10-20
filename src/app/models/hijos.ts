export class Hijos {
    public id_hijo:number
    public nombre:string
    public apellido: string
    public id_padre: number

    constructor(id_hijo?:number, nombre?:string, apellido?:string){
        this.id_hijo = id_hijo
        this.nombre = nombre
        this.apellido = apellido
    }
}
