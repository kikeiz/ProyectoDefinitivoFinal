let mysql = require ('mysql')
let connection = mysql.createConnection({
    hots: "1992.168.64.2",
    user: "root",
    password: null,
    database: "studentview"
});

connection.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Conexion correcta")
    }
});

const express = require ('express');
const bodyparser = require('body-parser');
const app = express()

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/login/profesor', (req,rep)=>{
    let id = req.params.ID
    sql = "SELECT profesor.username, profesor.password FROM profesor"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{
            rep.send(res)
        }
    })
})

app.get('/login/padre', (req,rep)=>{
    let id = req.params.ID
    sql = "SELECT padres.username, padres.password FROM padres"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{
            rep.send(res)
        }
    })
})

app.post('/signup/padre', (req,rep)=>{
    let params = new Array (req.body.username, req.body.password, req.body.email)
    sql = "INSERT INTO padres (username, password, email) VALUE (?,?,?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
        }
    })
})

app.post('/signup/profesor', (req,rep)=>{
    let params = new Array (req.body.username, req.body.password, req.body.email)
    sql = "INSERT INTO profesor (username, password, email) VALUE (?,?,?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
        }
    })
})

app.put('/peliculas', (req,rep)=>{
    let params = new Array (req.body.tittle, req.body.releaseYear, req.body.nationality, req.body.language, req.body.platform, req.body.isMCU, req.body.mainCharacterName, req.body.producer, req.body.distributor, req.body.genre, req.body.id)    
    sql = "UPDATE pelicula SET tittle = ?, releaseYear = ?, nationality = ?, language = ?, platform = ?, isMCU = ?, mainCharacterName = ?, producer = ?, distributor = ?, genre = ? WHERE movie_id = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{
            rep.send(res)
        }
    })
})

app.delete('/pelicula/actor', (req,rep)=>{
    let params = new Array (req.body.profid, req.body.movieid)
    sql = "DELETE  FROM  pelicula_profesionales WHERE profesionales_id = ? AND pelicula_id = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{
            rep.send(res)
        }
    })
})

app.listen(3019);