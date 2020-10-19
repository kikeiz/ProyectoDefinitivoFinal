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

let cors = require('cors')
app.use(cors())

app.post('/login/profesor', (req,rep)=>{
    let params = [req.body.username, req.body.password]
    sql = "SELECT * FROM profesor WHERE username = ? AND password = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{
            if(res.length > 0){
                rep.send({"status":"profeexiste", "id_profesor":res[0].id_profesor})
            }else{
                rep.send({"status":"profenoexiste"})
            }
        }
    })
})

app.post('/login/padre', (req,rep)=>{
    let params = [req.body.username, req.body.password]
    sql = "SELECT * FROM padres WHERE username = ? AND password = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{
            if(res.length > 0){
                rep.send({"status":"padreexiste", "id_padre":res[0].id_padre})
            }else{
                rep.send({"status":"padrenoexiste"})
            }
        }
    })
})



app.post('/register/profesor', (req,rep)=>{
    let username = req.body.username
    sql = "SELECT * FROM profesor WHERE username = ?"
    connection.query(sql, username, function(err,res){
        if(err){
            console.log(err)
        }else{
            console.log(res.length);
            if(res.length > 0){
                rep.send({"status":"existe"})
            }else{
                let params = new Array (req.body.username, req.body.password, req.body.email)
                sql = "INSERT INTO profesor (username, password, email) VALUE (?,?,?)"
                connection.query(sql, params, function(err,rer){
                    if(err){
                        console.log(err)
                    }else{ 
                        rep.send({"id_profesor":rer.insertId})
                    }
                })
            }
        }
    })
})

app.post('/register/padre', (req,rep)=>{
    let username = req.body.username
    sql = "SELECT * FROM padres WHERE username = ?"
    connection.query(sql, username, function(err,res){
        if(err){
            console.log(err)
        }else{
            console.log(res.length);
            if(res.length > 0){
                rep.send({"status":"existe"})
            }else{
                let params = new Array (req.body.username, req.body.password, req.body.email)
                sql = "INSERT INTO padres (username, password, email) VALUE (?,?,?)"
                connection.query(sql, params, function(err,rer){
                    if(err){
                        console.log(err)
                    }else{ 
                        rep.send({"id_padre":rer.insertId})
                    }
                })
            }
        }
    })
})


app.listen(3019);