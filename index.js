require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const userRoutes = require('./routes/routes.user');
const noteRoutes = require('./routes/routes.note');

connectDB();
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);


app.listen(port, () => {
    console.log(`Servidor Conectado en:  http://localhost:${port}`);
});
