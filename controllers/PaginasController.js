// Controlador de las diferentes páginas del proyecto
import { Testimonial } from '../models/Testimonial.js';
import { Viaje } from '../models/Viaje.js'

const paginaInicio = async (req, res) => {
    try {
        // const viajes = await Viaje.findAll({limit: 3});
        const consultasDB = await Promise.all([Viaje.findAll({limit: 3}), Testimonial.findAll({limit: 3})]);
        res.render('inicio', {
            pagina: 'Sobre Nosotros',
            clase: 'home',
            viajes: consultasDB[0],
            testimoniales: consultasDB[1]
        });
    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (req, res) => {

    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {
    try {
        // consultar DB
        const viajes = await Viaje.findAll();
        // Renderizar Vista
        res.render('viajes', {
            pagina: 'Próximos Viajes',
            viajes
        });
    } catch (error) {
        console.log(error);
    }
}

// funcion para renderizar un viaje particular
const paginaDetalleViaje = async (req, res) => {
    try {
        const { slug } = req.params;
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        });
    } catch (error) {
        console.log(error);
    }
};

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });    
    } catch (error) {
        console.log(error);
    }
}

export { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje };