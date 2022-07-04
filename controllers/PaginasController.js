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

// Página de administración
const paginaAdmin = async(req, res) => {
    // consultar Viajes
    const viajes = await Viaje.findAll();

    res.render('admin', {
        pagina: 'Administrar Viajes',
        viajes
    });
};

const crearViaje = (req, res) => {

    res.render('viaje-crear', {
        pagina: 'Crea un Nuevo Viaje',
    });
};

const editarViaje = async (req, res) => {

    // console.log(req.query); // Obtiene parametros de la url con el query string ?
    const {id} = req.query;

    try {
        const viaje = await Viaje.findOne({where: { slug: id }});
        const {titulo, precio, fecha_ida, fecha_vuelta, imagen, descripcion, disponibles} = viaje;
        res.render('viaje-editar', {
            pagina: 'Editar Viaje',
            titulo,
            precio,
            fecha_ida,
            fecha_vuelta,
            imagen,
            descripcion,
            disponibles
        })

    } catch (error) {
        console.log(error);
    }


};

export { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje, paginaAdmin, crearViaje,editarViaje};