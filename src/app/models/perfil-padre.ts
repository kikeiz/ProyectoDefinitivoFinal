export class PerfilPadre {
    public id_padre:number
    public nombre: string
    public apellidos: string
    public descripcion: string
    public username: string
    public password: string
    public email: string
    public contacto: number
    public foto: string
    constructor(nombre?:string,apellidos?:string,descripcion?:string,username?:string,password?:string,email?:string,contacto?:number,foto?:string){
        this.nombre=nombre
        this.apellidos=apellidos
        this.descripcion=descripcion
        this.username= username
        this.password=password
        this.email= email
        this.contacto=contacto
        this.foto=foto
    }
}

