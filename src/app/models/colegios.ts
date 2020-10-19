export class Colegios {
    public id_colegio:number;
    public nombre:string;
    public ciudad:string;

    constructor(id_colegio:number, nombre:string, ciudad:string){
        this.id_colegio = id_colegio
        this.nombre = nombre
        this.ciudad = ciudad
    }
}
