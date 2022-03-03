const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExist, usuarioExistById } = require('../helpers/db-validators');

router.get("/", usuariosGet);

router.put("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => usuarioExistById(id)),
  check('rol').custom(rol => esRolValido(rol)),
  validarCampos 
],usuariosPut);

router.post("/", [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener 6 carácteres como mínimo').isLength({ min: 6 }),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(correo => emailExist(correo)),
  // check('rol', 'No es un rol válido').isIn(['USER_ROL', 'ADMIN_ROL']),
  check('rol').custom(rol => esRolValido(rol)),
  validarCampos 
], usuariosPost);

router.delete("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(id => usuarioExistById(id)),
  validarCampos 
], usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;