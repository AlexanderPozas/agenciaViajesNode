import { Viaje, validarEntradas } from '../models/Viaje.js'

const guardarViaje = async (req, res) => {

    // Valida inputs
    let errores = validarEntradas(req.body);
    const { titulo, precio, fecha_ida, fecha_vuelta, imagen, descripcion, disponibles } = req.body;

    if (errores.length > 0) {
        res.render('viaje-crear', {
            pagina: 'Crea un Nuevo Viaje',
            titulo,
            precio,
            fecha_ida,
            fecha_vuelta,
            imagen,
            descripcion,
            disponibles,
            errores
        });
    } else {
        try {
            // Registrar en base de datos
            const imgSinMIME = imagen.slice(0, -4);
            const dividirTitulo = titulo.split(' ');
            const slug = 'viaje-' + dividirTitulo.join('-').toLowerCase();
            await Viaje.create({
                titulo,
                precio,
                fecha_ida,
                fecha_vuelta,
                imagen: imgSinMIME,
                descripcion,
                disponibles,
                slug
            });
            res.redirect('/admin');
        } catch (error) {
            console.log(error);
        }
    }
}

const guardarCambios = async (req, res) => {
    // Validar
    let errores = validarEntradas(req.body);
    const { id } = req.query;
    const { titulo, precio, fecha_ida, fecha_vuelta, imagen, descripcion, disponibles } = req.body;

    if (errores.length > 0) {
        res.render('viaje-editar', {
            pagina: 'Editar Viaje',
            errores,
            titulo,
            precio,
            fecha_ida,
            fecha_vuelta,
            imagen,
            descripcion,
            disponibles,
        })
    } else {
        try {
            // Actualizar info por slug
            const imgSinMIME = imagen.slice(0, -4);
            const dividirTitulo = titulo.split(' ');
            const slug = 'viaje-' + dividirTitulo.join('-').toLowerCase();
            await Viaje.update({
                titulo,
                precio,
                fecha_ida,
                fecha_vuelta,
                imagen: imgSinMIME,
                descripcion,
                disponibles,
                slug
            }, { where: { slug: id } });
            res.redirect('/admin');
        } catch (error) {
            console.log(error);
        }
    }
}

const eliminarViaje = async (req, res) => {
    const { id } = req.body;
    try {
        await Viaje.destroy({
            where: {
                slug: id
            }
        });

        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}


export { guardarViaje, guardarCambios, eliminarViaje }