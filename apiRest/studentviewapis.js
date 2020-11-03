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
        console.log(sql,params)

        if(err){
            console.log(err)
        }else{
            console.log(res)

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
                let params = new Array (req.body.username, req.body.password, req.body.email, req.body.foto)
                sql = "INSERT INTO profesor (username, password, email, foto) VALUE (?,?,?,?)"
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
//ACTUALIZAR DATOS PROFESOR//
app.put("/editarProfesor",
   function (req,res) {
        console.log(req.body)
        let sql = `UPDATE profesor SET nombre='${req.body.nombre}', apellidos= '${req.body.apellidos}', descripcion='${req.body.descripcion}',email='${req.body.email}',username='${req.body.username}', password='${req.body.password}',foto='${req.body.foto}' WHERE id_profesor='${req.body.id_profesor}'`;
            console.log(sql);
        connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    })
});

app.get("/obtenerProfesor/:id",
   function (req,res) {
    let paramId = req.params.id
    // console.log(params)
    let sql=`SELECT * FROM profesor WHERE id_profesor= ?`;
    connection.query(sql, paramId ,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    })
});

//ACTUALIZAR DATOS PADRE//

app.put("/editarPadre",
   function (req,res) {
        let params = [req.body.nombre, req.body.apellidos, req.body.descripcion, req.body.username, req.body.password, req.body.email, req.body.contacto, req.body.foto, req.body.id_padre]
        let sql = 'UPDATE padres SET nombre = ?, apellidos = ?, descripcion= ?, username = ?, password= ?, email = ?, contacto = ?, foto= ? WHERE id_padre = ?'
            console.log(sql);
        connection.query(sql,params,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    })
});
app.get("/obtenerPadre/:id",
   function (req,res) {
    let paramId = req.params.id
    // console.log(params)
    let sql=`SELECT * FROM padres WHERE id_padre= ?`;
    connection.query(sql, paramId ,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    })
});



app.put("/editarProfesor",
   function (req,res) {

        console.log(req.body)
        let sql = `UPDATE profesor SET nombre='${req.body.nombre}' , apellidos= '${ req.body.apellidos}', descripcion=' ${req.body.descripcion}',email=' ${req.body.email}',username=' ${req.body.username}', password=' ${req.body.password}',foto=' ${req.body.foto}' WHERE id_profesor= '${req.body.id_Profesor}' `;
            console.log(sql);
        connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    })
});

app.put("/editarPadre",
   function (req,res) {

        console.log(req.body)
        let sql = `UPDATE padres SET nombre='${req.body.nombre}' , apellidos= '${ req.body.apellidos}', descripcion=' ${req.body.descripcion}',username=' ${req.body.username}', password=' ${req.body.password}',email=' ${req.body.email}' WHERE id_padre= '${req.body.id_Padre}' `;
            console.log(sql);
        connection.query(sql,function(err,result) {
        if (err){
            console.log(err);
        } else {
            console.log(result);
        res.send(result)       
        }
    })
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

app.get('/alumno/clase/:id',(req,rep)=>{
    let id = req.params.id
    sql = "SELECT clases_alumnos.id_clases, alumnos.id_alumno, alumnos.nombre, alumnos.apellidos FROM clases_alumnos JOIN alumnos ON clases_alumnos.id_alumnos = alumnos.id_alumno WHERE clases_alumnos.id_clases = ?"
    connection.query(sql, id, function(err,res){
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

app.get('/notas/alumnos/:id', (req,rep)=>{
    let id = req.params.id
    sql = "SELECT notas.nota, notas.fecha, notas.tipo_calificacion, notas.id_nota, alumnos.nombre, alumnos.apellidos, notas.id_alumno, asignaturas.nombre, asignaturas.id_asignatura FROM notas JOIN alumnos ON notas.id_alumno = alumnos.id_alumno JOIN clases ON notas.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE alumnos.id_alumno = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.post('/notas', (req,rep)=>{
    let params = [req.body.nota, req.body.fecha, req.body.id_profesor, req.body.id_alumno, req.body.tipo, req.body.id_clase]
    sql = "INSERT INTO notas (nota, fecha, id_profesor, id_alumno, tipo_calificacion, id_clase) VALUE (?,?,?,?,?,?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/notas/:id', (req,rep)=>{
    let id = req.params.id
    sql = "SELECT AVG(nota) AS media, fecha, tipo_calificacion FROM notas WHERE id_clase = ? GROUP BY tipo_calificacion, fecha"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.post('/alumnos/examen', (req,rep)=>{
    let params = [req.body.fecha, req.body.tipo, req.body.id_clase]
    sql = "SELECT alumnos.nombre, alumnos.apellidos, alumnos.id_alumno, notas.id_nota, notas.nota FROM notas JOIN alumnos ON notas.id_alumno = alumnos.id_alumno WHERE notas.fecha = ? AND tipo_calificacion = ? AND id_clase = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.put('/notas', (req,rep)=>{
    let params = [req.body.nota, req.body.id_nota]
    sql = "UPDATE notas SET notas.nota = ? WHERE notas.id_nota = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/filtrar/:id_clase/:notamin/:notamax/:tipo', (req,rep)=>{
    let params = [req.params.id_clase, req.params.notamin, req.params.notamax, req.params.tipo]
    if(req.params.tipo != "todos"){
        sql = "SELECT * FROM (SELECT AVG(notas.nota) AS media, notas.fecha AS fecha1, notas.tipo_calificacion AS tipo FROM notas WHERE id_clase = ? GROUP BY notas.fecha, notas.tipo_calificacion) AS notitas WHERE notitas.media >= ? AND notitas.media <= ? AND tipo = ?"
        connection.query(sql, params, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }else{
        let param = [req.params.id_clase, req.params.notamin, req.params.notamax]
        sql = "SELECT * FROM (SELECT AVG(notas.nota) AS media, notas.fecha AS fecha1, notas.tipo_calificacion AS tipo FROM notas WHERE id_clase = ? GROUP BY notas.fecha, notas.tipo_calificacion) AS notitas WHERE notitas.media >= ? AND notitas.media <= ?"
        connection.query(sql, param, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }
})

app.get('/filtrar/notas/alumnos/:idalumno/:notamax/:notamin/:tipo/:id_asignatura', (req,rep)=>{
    let params = [req.params.idalumno, req.params.notamin, req.params.notamax, req.params.tipo, req.params.id_asignatura]
    if(req.params.tipo != "todos" && req.params.id_asignatura != "todos"){
        sql ="SELECT * FROM (SELECT notas.nota AS calificacion, notas.fecha, notas.tipo_calificacion, notas.id_nota, alumnos.nombre AS alumno, alumnos.apellidos, notas.id_alumno, asignaturas.nombre AS asignatura, asignaturas.id_asignatura AS id_asignaturas FROM notas JOIN alumnos ON notas.id_alumno = alumnos.id_alumno JOIN clases ON notas.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE alumnos.id_alumno = ?) AS tabla1 WHERE calificacion >= ? AND calificacion <= ? AND tipo_calificacion = ? AND id_asignaturas = ?"
        connection.query(sql, params, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }else if(req.params.tipo != "todos"){
        let param = [req.params.idalumno, req.params.notamin, req.params.notamax, req.params.tipo]
        sql = "SELECT * FROM (SELECT notas.nota AS calificacion, notas.fecha, notas.tipo_calificacion, notas.id_nota, alumnos.nombre AS alumno, alumnos.apellidos, notas.id_alumno, asignaturas.nombre AS asignatura, asignaturas.id_asignatura AS id_asignaturas FROM notas JOIN alumnos ON notas.id_alumno = alumnos.id_alumno JOIN clases ON notas.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE alumnos.id_alumno = ?) AS tabla1 WHERE calificacion >= ? AND calificacion <= ? AND tipo_calificacion = ?"
        connection.query(sql, param, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }else if(req.params.id_asignatura != "todos"){
        let par = [req.params.idalumno, req.params.notamin, req.params.notamax, req.params.id_asignatura]
        sql = "SELECT * FROM (SELECT notas.nota AS calificacion, notas.fecha, notas.tipo_calificacion, notas.id_nota, alumnos.nombre AS alumno, alumnos.apellidos, notas.id_alumno, asignaturas.nombre AS asignatura, asignaturas.id_asignatura AS id_asignaturas FROM notas JOIN alumnos ON notas.id_alumno = alumnos.id_alumno JOIN clases ON notas.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE alumnos.id_alumno = ?) AS tabla1 WHERE calificacion >= ? AND calificacion <= ? AND id_asignaturas = ?"
        connection.query(sql, par, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }else{
        let p = [req.params.idalumno, req.params.notamin, req.params.notamax]
        sql = "SELECT * FROM (SELECT notas.nota AS calificacion, notas.fecha, notas.tipo_calificacion, notas.id_nota, alumnos.nombre AS alumno, alumnos.apellidos, notas.id_alumno, asignaturas.nombre AS asignatura, asignaturas.id_asignatura AS id_asignaturas FROM notas JOIN alumnos ON notas.id_alumno = alumnos.id_alumno JOIN clases ON notas.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE alumnos.id_alumno = ?) AS tabla1 WHERE calificacion >= ? AND calificacion <= ?"
        connection.query(sql, p, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }
})

// app.get('/filtrar/notas/alumnos/:notamin/:notamax/:asignatura/:')

//MENSAJES

app.post('/mensaje', (req,rep)=>{
    let params = [req.body.tipo, req.body.contenido, req.body.valor, req.body.envia, req.body.fecha, req.body.id_clase, req.body.id_alumno]
    sql = "INSERT INTO mensajes (tipo, contenido, valor, quienenvia, fecha, id_clase, id_alumno) VALUES (?, ?, ?, ?, ?, ?, ?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})


app.get('/mensaprofe/:id_clase/:id_alumno', (req, rep)=>{
    let params = [req.params.id_clase, req.params.id_alumno]
    if(req.params.id_alumno == "todos"){
        let id = req.params.id_clase
        sql = "SELECT alumnos.nombre, alumnos.apellidos, mensajes.id_mensaje, mensajes.tipo, mensajes.contenido, mensajes.valor, mensajes.id_clase, mensajes.id_alumno, mensajes.fecha FROM mensajes JOIN alumnos ON mensajes.id_alumno = alumnos.id_alumno WHERE mensajes.id_clase = ? AND mensajes.quienenvia = 'padre'"
        connection.query(sql, id, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }else{
        sql = "SELECT alumnos.nombre, alumnos.apellidos, mensajes.id_mensaje, mensajes.tipo, mensajes.contenido, mensajes.valor, mensajes.id_clase, mensajes.id_alumno, mensajes.fecha FROM mensajes JOIN alumnos ON mensajes.id_alumno = alumnos.id_alumno WHERE mensajes.id_clase = ? AND mensajes.quienenvia = 'padre' AND mensajes.id_alumno = ?"
        connection.query(sql, params, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }
    
})

app.get('/filtro/mensajes/:id_alumno/:tipo', (req,rep)=>{
    let params = [req.params.id_alumno, req.params.tipo]
    if(req.params.tipo == "todos"){
        let param = [req.params.id_alumno]
        sql = "SELECT * FROM mensajes WHERE mensajes.id_alumno = ? AND mensajes.quienenvia = 'profesor'"
        connection.query(sql, param, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }else{
        sql = "SELECT * FROM mensajes WHERE mensajes.id_alumno = ? AND mensajes.quienenvia = 'profesor' AND mensajes.tipo = ?"
        connection.query(sql, params, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }
})

app.get('/mensajes/:id_alumno', (req,rep)=>{
    let id = req.params.id_alumno
    sql = "SELECT asignaturas.nombre, mensajes.id_mensaje, mensajes.tipo, mensajes.contenido, mensajes.valor, mensajes.quienenvia, mensajes.fecha, mensajes.id_clase, mensajes.id_alumno FROM mensajes JOIN clases ON mensajes.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE mensajes.id_alumno = ? AND mensajes.quienenvia = 'profesor'"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/mensajes/clase/:id_clase', (req,rep)=>{
    let id = req.params.id_clase
    sql = "SELECT asignaturas.nombre, mensajes.id_mensaje, mensajes.tipo, mensajes.contenido, mensajes.valor, mensajes.quienenvia, mensajes.fecha, mensajes.id_clase, mensajes.id_alumno, alumnos.nombre AS nombre_alumno, alumnos.apellidos FROM mensajes JOIN clases ON mensajes.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura JOIN alumnos ON mensajes.id_alumno = alumnos.id_alumno WHERE mensajes.id_clase = ? AND mensajes.quienenvia = 'padre'"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.delete('/mensaje', (req,rep)=>{
    let id = req.body.id
    sql = "DELETE FROM mensajes WHERE mensajes.id_mensaje = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})


// COMPORTAMIENTO PROFESOR

app.post('/comportamiento', (req,rep)=>{
    let params = [req.body.tipo_comportamiento, req.body.id_alumno, req.body.id_clase]
    sql = "INSERT INTO comportamiento (tipo_comportamiento, nota, id_alumno, id_clase) VALUES (?, 10, ?, ?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})


app.get('/bhviour/:id_clase/:tipo/:id_alumno', (req,rep)=>{
    let params = [req.params.id_clase, req.params.id_alumno, req.params.tipo]
    sql = "SELECT * FROM comportamiento WHERE  comportamiento.id_clase = ? AND comportamiento.id_alumno = ? AND comportamiento.tipo_comportamiento = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})


app.put('/modificar/comportamiento', (req,rep)=>{
    let params = [req.body.nota, req.body.id_comportamiento]
    sql = "UPDATE comportamiento SET comportamiento.nota = ? WHERE id_comportamiento = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/comportamientos/alumno/:id/:id_clase', (req,rep)=>{
    let params = [req.params.id, req.params.id_clase]
    sql = "SELECT comportamiento.id_comportamiento, comportamiento.tipo_comportamiento, comportamiento.nota, comportamiento.id_alumno, comportamiento.id_clase, alumnos.nombre, alumnos.apellidos FROM comportamiento JOIN alumnos ON comportamiento.id_alumno = alumnos.id_alumno WHERE comportamiento.id_alumno = ? AND comportamiento.id_clase = ?"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})


app.get('/behaviour/class/:id', (req,rep)=>{
    let idd = req.params.id
    sql = "SELECT AVG(nota) AS nota_media, comportamiento.tipo_comportamiento FROM comportamiento WHERE comportamiento.id_clase = ? GROUP BY tipo_comportamiento"
    connection.query(sql, idd, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

//COMPORTAMIENTO PADRE

app.get('/clases/alumno/:id_alumno', (req,rep)=>{
    let id = req.params.id_alumno
    sql = "SELECT asignaturas.nombre, clases_alumnos.id_clases FROM clases_alumnos JOIN clases ON clases_alumnos.id_clases = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE id_alumnos = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

// ASISTENCIA

app.post('/asistencia', (req,rep)=>{
    let params = [req.body.fecha, req.body.id_alumno, req.body.id_clase, req.body.asiste, req.body.justificada]
    sql = "INSERT INTO asistencia (fecha, id_alumno, id_clase, asiste, justificada) VALUES (?, ?, ?, ?, ?)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/detalle/:id_clase', (req,rep)=>{
    let id = req.params.id_clase
    sql = "SELECT COUNT(CASE WHEN asistencia.asiste = false AND asistencia.justificada = false THEN 1 END) AS no_justificadas, COUNT(CASE WHEN asistencia.asiste = false AND asistencia.justificada = true THEN 1 END) AS justificada, COUNT(CASE WHEN asistencia.asiste = true OR asistencia.asiste = false THEN 1 END) AS total, COUNT(CASE WHEN asistencia.asiste = true THEN 1 END) AS asistencias, alumnos.nombre, alumnos.apellidos, asistencia.id_alumno, (COUNT(CASE WHEN asistencia.asiste = true THEN 1 END)*100)/ COUNT(CASE WHEN asistencia.asiste = true OR asistencia.asiste = false THEN 1 END) AS porcentaje_asiste, (COUNT(CASE WHEN asistencia.asiste = false AND asistencia.justificada = true THEN 1 END)*100)/COUNT(CASE WHEN asistencia.asiste = true OR asistencia.asiste = false THEN 1 END) AS porcentaje_justificada, (COUNT(CASE WHEN asistencia.asiste = false AND asistencia.justificada = false THEN 1 END)*100)/COUNT(CASE WHEN asistencia.asiste = true OR asistencia.asiste = false THEN 1 END) AS porcentaje_nojustificada FROM asistencia JOIN alumnos ON asistencia.id_alumno = alumnos.id_alumno WHERE asistencia.id_clase = ? GROUP BY asistencia.id_alumno"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/porcentaje/:id', (req,rep)=>{
    let id = req.params.id
    sql = "SELECT (COUNT(CASE WHEN asiste = true THEN 1 END)*100)/ COUNT(asiste) AS asistencias, fecha FROM asistencia WHERE id_clase = ? GROUP BY fecha"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/faltas/:id_clase/:fecha', (req,rep)=>{
    let params = [req.params.id_clase, req.params.fecha]
    sql = "SELECT alumnos.nombre, alumnos.apellidos, asistencia.id_alumno, asistencia.justificada FROM asistencia JOIN alumnos ON asistencia.id_alumno = alumnos.id_alumno WHERE id_clase = ? AND asistencia.fecha = ? AND asistencia.asiste = false"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/faltasAlumno/:id_alumno', (req,rep)=>{
    let params = [req.params.id_alumno]
    sql = "SELECT asignaturas.nombre, asistencia.id_clase, asistencia.fecha, asistencia.id_asistencia FROM asistencia JOIN clases ON asistencia.id_clase = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE asistencia.id_alumno = ? AND asistencia.asiste = false AND asistencia.justi_enviado = false"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.put('/confirmar/justificante', (req,rep)=>{
    if(req.body.justificada == false){
        let params = [req.body.id_clase, req.body.id_alumno, req.body.fecha]
        sql = "UPDATE asistencia SET justificada = false WHERE asistencia.asiste = false AND id_clase = ? AND id_alumno = ? AND fecha = ?"
        connection.query(sql, params, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }else{
        let params = [req.body.id_clase, req.body.id_alumno, req.body.fecha]
        sql = "UPDATE asistencia SET justificada = true WHERE asistencia.asiste = false AND id_clase = ? AND id_alumno = ? AND fecha = ?"
        connection.query(sql, params, function(err,res){
            if(err){
                console.log(err)
            }else{ 
                rep.send(res)
             }
        });
    }
    
})

app.put('/justificar', (req,rep)=>{
    let id = req.body.id_asistencia
    sql = "UPDATE asistencia SET asistencia.justi_enviado = true WHERE id_asistencia = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/datos/falta/:id_asistencia', (req,rep)=>{
    let id = req.params.id_asistencia
    sql = "SELECT alumnos.nombre, alumnos.apellidos, asistencia.fecha, asistencia.id_alumno, asistencia.id_clase FROM asistencia JOIN alumnos ON asistencia.id_alumno = alumnos.id_alumno WHERE asistencia.id_asistencia = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

// HOME
app.get('/todos/:id_padre', (req,rep)=>{
    let id = req.params.id_padre
    sql = "SELECT alumnos.nombre, alumnos.id_alumno, alumnos.apellidos, colegio.nombre AS colegio, cursos.nombre AS curso FROM alumnos JOIN clases_alumnos ON alumnos.id_alumno = clases_alumnos.id_alumnos JOIN clases ON clases_alumnos.id_clases = clases.id_clase JOIN colegio ON clases.id_colegio = colegio.id_colegio JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura JOIN cursos ON clases.id_curso = cursos.id_curso WHERE alumnos.id_padre = ? GROUP BY alumnos.id_alumno"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/asignaturas/alumno/:id_alumno', (req,rep)=>{
    let id = req.params.id_alumno
    sql = "SELECT asignaturas.nombre AS asignaturas FROM alumnos JOIN clases_alumnos ON alumnos.id_alumno = clases_alumnos.id_alumnos JOIN clases ON clases_alumnos.id_clases = clases.id_clase JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura WHERE alumnos.id_alumno = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/clases/profesor/:id_profesor', (req,rep)=>{
    let id = req.params.id_profesor
    sql = "SELECT asignaturas.nombre AS asignatura, cursos.nombre AS curso, colegio.nombre AS colegio, clases.id_clase, clases.nombre_clase, clases.id_asignatura, clases.id_curso, clases.id_colegio FROM clases JOIN asignaturas ON clases.id_asignatura = asignaturas.id_asignatura JOIN cursos ON clases.id_curso = cursos.id_curso JOIN colegio ON clases.id_colegio = colegio.id_colegio WHERE clases.id_profesor = ? GROUP BY clases.id_clase"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/masalumnos/:id_curso/:id_colegio/:id_clase', (req,rep)=>{
    let params = [req.params.id_curso, req.params.id_colegio, req.params.id_clase]
    sql = "SELECT * FROM alumnos WHERE id_alumno NOT IN (SELECT alumnos.id_alumno FROM alumnos JOIN clases_alumnos ON alumnos.id_alumno = clases_alumnos.id_alumnos WHERE alumnos.id_curso = ? AND alumnos.id_colegio = ? AND clases_alumnos.id_clases = ? GROUP BY alumnos.id_alumno)"
    connection.query(sql, params, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})

app.get('/alumnosxclase/:id_clase', (req,rep)=>{
    let id = req.params.id_clase
    sql = "SELECT alumnos.nombre, alumnos.apellidos FROM clases_alumnos JOIN alumnos ON clases_alumnos.id_alumnos = alumnos.id_alumno WHERE clases_alumnos.id_clases = ?"
    connection.query(sql, id, function(err,res){
        if(err){
            console.log(err)
        }else{ 
            rep.send(res)
         }
    });
})
app.listen(3019);