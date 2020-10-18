export class User {
    public nombre:string;
    public apellidos:string;
    public descripcion:string;
    public username:string;
    public password:string;
    public email:string;

    constructor(nombre?:string, apellidos?:string, descripcion?:string, username?:string, password?:string, email?:string){
        this.nombre = nombre
        this.apellidos = apellidos
        this.descripcion = descripcion
        this.username = username
        this.email = email
    }
}
