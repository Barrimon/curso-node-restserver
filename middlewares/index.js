
const ValidarCamposIndex        = require('../middlewares/validar-campos');
const ValidarJWTIndex           = require('../middlewares/validar-jwt');
const ValidaRolesIndex          = require('../middlewares/validar.roles');
const ValidarArchivosSubirIndex = require('../middlewares/validar-archivo');

module.exports = {
  ...ValidarCamposIndex,
  ...ValidarJWTIndex,
  ...ValidaRolesIndex,
  ...ValidarArchivosSubirIndex
}
