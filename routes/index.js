/* Router */
import express from 'express';
import * as PaginasController from '../controllers/PaginasController.js'
import * as TestimonialesController from '../controllers/TestimonialesController.js'
import * as ViajesController from '../controllers/ViajesController.js'

const router = express.Router();

router.get('/', PaginasController.paginaInicio);

router.get('/nosotros', PaginasController.paginaNosotros);

router.get('/viajes', PaginasController.paginaViajes);
router.get('/viajes/:slug', PaginasController.paginaDetalleViaje); // Comodín, req.params

router.get('/testimoniales', PaginasController.paginaTestimoniales);
router.post('/testimoniales', TestimonialesController.guardarTestimonial);

// Adiminstración de Viajes
router.get('/admin', PaginasController.paginaAdmin);
router.get('/admin/crear', PaginasController.crearViaje);
router.post('/admin/crear', ViajesController.guardarViaje);
router.get('/admin/editar', PaginasController.editarViaje);
router.post('/admin/editar', ViajesController.guardarCambios);
router.post('/admin/eliminar', ViajesController.eliminarViaje);
export default router;