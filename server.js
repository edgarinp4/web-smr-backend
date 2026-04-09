const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 CONEXIÓN MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/smr')
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

// 🔥 MODELO
const Mensaje = mongoose.model('Mensaje', {
    nombre: String,
    telefono: String,
    correo: String,
    mensaje: String,
    fecha: {
        type: Date,
        default: Date.now
    }
});

// 🔥 GUARDAR MENSAJE
app.post('/contacto', async (req, res) => {
    try {
        const nuevo = new Mensaje(req.body);
        await nuevo.save();

        console.log("Mensaje guardado en BD");

        res.json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al guardar" });
    }
});

// 🔥 OBTENER MENSAJES
app.get('/contacto', async (req, res) => {
    try {
        const data = await Mensaje.find().sort({ fecha: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener" });
    }
});

// 🔥 ELIMINAR MENSAJE
app.delete('/contacto/:id', async (req, res) => {
    try {
        await Mensaje.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// 🔥 SERVER
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});