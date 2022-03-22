const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { categoriaExistById, categoriaExistByName } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole, tieneRol } = require('../middlewares'); 

const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => categoriaExistById(id)),
  validarCampos
], obtenerCategoria);

//Crear una Categoria - privado - cualquier usuario con token válido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(nombre => categoriaExistByName(nombre)),
  validarCampos
], crearCategoria);

//Actualizar una Categoria - privado - cualquier usuario con token válido
router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => categoriaExistById(id)),
  check('nombre').custom(nombre => categoriaExistByName(nombre)),
  validarCampos
],actualizarCategoria);

//Borrar una Categoria - Usuario Administrador
router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => categoriaExistById(id)),
  validarCampos
], borrarCategoria);

module.exports = router;