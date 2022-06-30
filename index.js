/*Configurar Servidor Common Js*/

// const express = require('express');

/**Configurar Servidor con Modules */

import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'

const app = express();

// Conectar a la BD
db.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error));


// Definir puerto
const port = process.env.PORT || 8000;

// Template engine
app.set('view engine', 'pug');

// MiddleWare propio
app.use((req, res, next) => {
    const year = new Date();
    res.locals.fullYear = year.getFullYear(); // variable disponible en todas las vistas
    
    next();
});

// Agregar body parser para leer los datos de un formulario
app.use(express.urlencoded({extended: true}));

// Definir /public
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está funcionando el el puerto ${port}`)
});

