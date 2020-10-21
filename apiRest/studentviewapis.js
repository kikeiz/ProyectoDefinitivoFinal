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


// LOGIN Y REGISTER

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

});

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
    });
});
   
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
});

// AÑADIR CLASE Y ALUMNO


app.get("/asignaturas",function (req,res) {
    let sql="SELECT * FROM asignaturas";
    connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            res.send(result)       
        }
    });
});

app.get("/colegio", function (req,res) {
    let sql="SELECT * FROM colegio";
    connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            res.send(result)       
        }
    });
});

app.get("/cursos",
   function (req,res) {
    let sql="SELECT *FROM cursos";
    connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            res.send(result) 
         }
    });
});     
          
app.post('/aniadirclase', (req,rep)=>{
    let params = new Array (req.body.nombre_clase, req.body.id_profesor, req.body.id_asignatura,req.body.id_curso, req.body.id_colegio)
    sql = "INSERT INTO clases (nombre_clase, id_profesor, id_asignatura, id_curso, id_colegio) VALUE (?,?,?,?,?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
});

app.post('/aniadiralumno', (req,rep)=>{
    let params = new Array (req.body.nombre, req.body.apellidos, req.body.id_padre, req.body.id_colegio,req.body.id_curso)
    sql = "INSERT INTO alumnos (nombre, apellidos, id_padre, id_colegio, id_curso) VALUE (?,?,?,?,?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
});

app.get('/alumnos/:id/:Id', (req,rep)=>{
    let params = [req.params.id, req.params.Id]
    sql = "SELECT alumnos.id_alumno, alumnos.nombre, alumnos.apellidos FROM alumnos WHERE id_curso = ? AND id_colegio = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/alumnos/:id',(req,rep)=>{
    let id = req.params.id
    sql = "SELECT * FROM alumnos WHERE id_padre = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.post('/alumnos', (req,rep)=>{
    let params = [req.body.id_clase, req.body.id_alumno]
    sql = "INSERT INTO clases_alumnos (id_clases, id_alumnos) VALUE (?,?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})
          

// MIS CLASES

app.get('/misclases/:id',(req,rep)=>{
    let id = req.params.id
    sql = "SELECT nombre_clase, id_colegio, id_asignatura, id_curso, id_clase FROM clases WHERE id_profesor = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
});

app.get('/clases/:id', (req,rep)=>{
    let id = req.params.id
    sql = "SELECT * FROM clases WHERE id_clase = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

// NOTAS

app.get('/notasalumnos/:id', (req,rep)=>{
    let id = req.params.id
    sql = "SELECT * FROM clases_alumnos JOIN alumnos ON alumnos.id_alumno = clases_alumnos.id_alumnos WHERE clases_alumnos.id_clases = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})
app.listen(3019);