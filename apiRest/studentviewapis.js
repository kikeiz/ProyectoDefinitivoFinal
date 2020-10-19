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


app.get("aniadir/asignaturas",
   function (req,res) {
    let sql="SELECT *FROM asignaturas";
    connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    });
});

app.get("aniadir/colegio",
   function (req,res) {
    let sql="SELECT *FROM colegio";
    connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    });
});

app.get("aniadir/cursos",
   function (req,res) {
    let sql="SELECT *FROM cursos";
    connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    });
});

app.post('/aniadirclase', (req,rep)=>{
    let params = new Array (req.body.id_clase, req.body.nombre_clase, req.body.id_asignatura,req.body.id_curso)
    sql = "INSERT INTO clases (id_clase, nombre_clase, id_profesor, id_asignatura, id_curso) VALUE (?,?,?,?,?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
        }
    })
})

app.listen(3019);