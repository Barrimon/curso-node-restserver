const { Router } = require('express');
const { check } = require('express-validator');

const {
        crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto
      } = require('../controllers/productos');
const { categoriaExistById, categoriaExistByName, productoExistByName, productoExistById } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole, tieneRol } = require('../middlewares'); 

const router = Router();

//Obtener todas los Productos - publico
router.get('/', obtenerProductos);

//Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => productoExistById(id)),
  validarCampos
], obtenerProducto);

//Crear una Producto - privado - cualquier usuario con token válido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'La categoria es obligatorio').not().isEmpty(),
  check('categoria', 'No es un Id válido').isMongoId(),
  check('categoria').custom(categoria => categoriaExistById(categoria)),
  check('nombre').custom(nombre => productoExistByName(nombre)),
  validarCampos
], crearProducto);

//Actualizar una Producto - privado - cualquier usuario con token válido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => productoExistById(id)),
  check('categoria', 'No es un Id válido').isMongoId(),
  check('nombre').custom(nombre => productoExistByName(nombre)),
  validarCampos
],actualizarProducto);

//Borrar una Producto - Usuario Administrador
router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => productoExistById(id)),
  validarCampos
], borrarProducto);

module.exports = router;