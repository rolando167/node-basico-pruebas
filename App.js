const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

app.use('/api/v1', require('./src/routes'));

app.get('/', (req, res) => {
    res.send("GET Request Called 😺 🔹 - Nginx")
});

app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${PORT} 👍`);
    console.warn(`http://localhost:${PORT}/api/v1`);
})

// > npm run dev
// console.log(`Servidor encendido en el puerto ${PORT} 👍`);