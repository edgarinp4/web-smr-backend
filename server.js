const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 CONEXIÓN MONGODB (ATLAS)
mongoose.connect('mongodb+srv://edgarinp4:Alexinm33.@cluster0.klnwc5r.mongodb.net/smr?retryWrites=true&w=majority')
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
        console.log(error);
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

// 🔥 PUERTO PARA RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto ' + PORT);
});