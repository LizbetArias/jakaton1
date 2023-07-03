import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'america',
  password: 'admin',
  database: 'prueba1',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos!');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para insertar los datos del formulario en la base de datos
app.post('/api/consultas', (req, res) => {
  const { NOMBRES, APELLIDOS, TELEFONO, EMAIL, MSG } = req.body;

  // Verificar que todos los campos estén llenos
  if (!NOMBRES || !APELLIDOS || !TELEFONO || !EMAIL || !MSG) {
    res.status(400).json({ error: 'Asegúrese de que todos los campos estén completos' });
    return;
  }

  const mensaje = { NOMBRES, APELLIDOS, TELEFONO, EMAIL, MSG };

  connection.query('INSERT INTO consultas SET ?', mensaje, (err, result) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.sendStatus(500);
      return;
    }
    console.log("Formulario enviado exitosamente");
    res.redirect('/');
  });
});

// Serve static files
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

// Set up views directory and view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render index.ejs on root route
app.get('/', (req, res) => res.render('index.ejs'));

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el localhost:${port}`);
});
