const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizaImagen, mostrarImage, actualizaImagenClouddinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
  validarArchivoSubir,
  check('id', 'El id debe ser de Mongo').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], actualizaImagenClouddinary)
// ], actualizaImagen)

router.get('/:coleccion/:id', [
  check('id', 'El id debe ser de Mongo').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], mostrarImage)


module.exports = router;