export class Hijos {
    public id_hijo:number
    public nombre:string
    public apellido: string
    public id_padre: number

    constructor(nombre:string, apellido:string){
        this.nombre = nombre
        this.apellido = apellido
    }
}
