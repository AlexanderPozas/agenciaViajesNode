/* Router */
import express from 'express';
import * as PaginasController from '../controllers/PaginasController.js'
import * as TestimonialesController from '../controllers/TestimonialesController.js'

const router = express.Router();

router.get('/', PaginasController.paginaInicio);

router.get('/nosotros', PaginasController.paginaNosotros);

router.get('/viajes', PaginasController.paginaViajes);
router.get('/viajes/:slug', PaginasController.paginaDetalleViaje); // Comodín, req.params

router.get('/testimoniales', PaginasController.paginaTestimoniales);
router.post('/testimoniales', TestimonialesController.guardarTestimonial);

export default router;