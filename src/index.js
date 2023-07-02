// Importar librerias

import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql';
import cors from 'cors';

//creamos las rutas absolutas (_dirname = src)
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, '/views'));
app.set("view engine", 'ejs');

app.get('/', (req, res) => res.render('index'));

app.use(express.static(join(__dirname, 'public')));

// Configuraciones


app.use(json());
app.use(cors());


var conexion = createConnection(
    {
        host: "127.0.0.1",
        user: "arias",
        password: "admin",
        database: "prueba1"
    }
);


conexion.connect(
    function (error) {
        if (error) {
            throw error;
        } else {
            console.log("Conexion Exitosa");
        }
    }
);


const port = process.env.PUERTO || 3000;


app.listen(
    port, function () {
        console.log("Servidor funcionando en puerto: " + port)
    }
);


// localhost: 3000
app.post(
    "/api/consultas", (req, res) => {
        let data = {
            NOMBRES: req.body.NOMBRES,
            APELLIDOS: req.body.APELLIDOS,
            TELEFONO: req.body.TELEFONO,
            EMAIL: req.body.EMAIL,
            MSG: req.body.MSG
           
        }
        let sql = "INSERT INTO consultas SET ?";
        conexion.query(
            sql, data, function (error, resultados) {
                if (error) {
                    throw error;
                } else {
                    console.log(data),
                    res.send(data)
                }
            }
        );
    }
);