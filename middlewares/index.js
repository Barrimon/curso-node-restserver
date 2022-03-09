
const ValidarCamposIndex = require('../middlewares/validar-campos');
const ValidarJWTIndex  = require('../middlewares/validar-jwt');
const ValidaRolesIndex = require('../middlewares/validar.roles');


module.exports = {
  ...ValidarCamposIndex,
  ...ValidarJWTIndex,
  ...ValidaRolesIndex
}
