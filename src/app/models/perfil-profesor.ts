export class PerfilProfesor {


    public id_profesor:number
    public nombre: string
    public apellidos: string
    public descripcion: string
    public email: string
    public username: string
    public password: string
    public foto: string
    constructor(nombre?:string,apellidos?:string,descripcion?:string,email?:string,usarname?:string,password?:string,foto?:string){
        this.nombre=nombre
        this.apellidos=apellidos
        this.descripcion=descripcion
        this.email=email
        this.username=usarname
        this.password=password
        this.foto=foto
    }
}

