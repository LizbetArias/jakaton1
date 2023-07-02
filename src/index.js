// Importar librerias
const express = require('express');
const { join } = require('path');
const mysql = require('mysql');
const cors = require('cors');

// Creamos las rutas absolutas (_dirname = src)
const app = express();

app.set("views", join(__dirname, '/views'));
app.set("view engine", 'ejs');

app.get('/', (req, res) => res.render('index'));

app.use(express.static(join(__dirname, 'public')));

// Configuraciones
app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
    host: "127.0.0.1",
    user: "america",
    password: "admin",
    database: "prueba1"
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Conexión Exitosa");
    }
});

const port = process.env.PUERTO || 3000;

app.listen(port, function () {
    console.log("Servidor funcionando en puerto: " + port);
});

// localhost:3000
app.post("/api/consultas", (req, res) => {
    let data = {
        NOMBRES: req.body.NOMBRES,
        APELLIDOS: req.body.APELLIDOS,
        TELEFONO: req.body.TELEFONO,
        EMAIL: req.body.EMAIL,
        MSG: req.body.MSG
    };

    let sql = "INSERT INTO consultas SET ?";
    conexion.query(sql, data, function (error, resultados) {
        if (error) {
            throw error;
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

