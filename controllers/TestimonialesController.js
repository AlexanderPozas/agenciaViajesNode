// Controlador de testimoniales
import {Testimonial} from '../models/Testimonial.js'

const guardarTestimonial = async (req, res) => {

    // Validar formulario
    const {nombre, email, mensaje} = req.body;
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre es obligatorio'});
    }
    if(email.trim() === '') {
        errores.push({mensaje: 'El email es obligatorio'});
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje es obligatorio'});
    }

    if(errores.length > 0) {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    }else {
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }

};

export { guardarTestimonial };