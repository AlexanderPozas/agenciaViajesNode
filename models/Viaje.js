import Sequelize from 'sequelize';
import db from '../config/db.js';

const Viaje = db.define('viajes', {
    titulo: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.STRING
    },
    fecha_ida: {
        type: Sequelize.DATE
    },
    fecha_vuelta: {
        type: Sequelize.DATE
    },
    imagen: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    disponibles: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    }
});

// Validar Crear y Editar Viajes
const validarEntradas = (data) => {
    let errores = [];
    const { titulo, precio, fecha_ida, fecha_vuelta, imagen, descripcion, disponibles } = data;

    if (titulo.trim() === '') {
        errores.push({ mensaje: 'El destino es obligatorio' });
    }
    if (precio === '' || isNaN(parseInt(precio))) {
        errores.push({ mensaje: 'El precio es obligatorio' });
    }
    if (fecha_ida === '') {
        errores.push({ mensaje: 'La fecha de ida es obligatoria' });
    }
    if (fecha_vuelta === '') {
        errores.push({ mensaje: 'La fecha de vuelta es obligatoria' });
    }
    if (imagen.trim() === '') {
        errores.push({ mensaje: 'La imagen es obligatoria' });
    }
    if (descripcion.trim() === '') {
        errores.push({ mensaje: 'La descripcion es obligatoria' });
    }
    if (disponibles === '' || isNaN(parseInt(disponibles))) {
        errores.push({ mensaje: 'Los lugares disponibles son obligatorios' });
    }

    return errores;
}

export { Viaje, validarEntradas };