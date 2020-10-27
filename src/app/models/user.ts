export class User {
    public username: string
    public password:string
    public email:string
    public foto:string

    constructor( username?:string, password?:string, email?:string,foto?:string){
        this.username = username
        this.password = password
        this.email = email
        this.foto=foto
    }
}
