const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
  const existRole = await Role.findOne({ rol });
  if (!existRole) {
    throw new Error(`El rol ${rol} no esta registrardo en la BD`);
  }
}

const emailExist = async (correo = '') => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El email ${correo} ya existe en la BD`);
  }
}

const usuarioExistById = async (id) => {
  const existUsuario = await Usuario.findById(id)
  if (!existUsuario) {
    throw new Error(`El id: ${id} no existe`);
  }
}

module.exports = {
  esRolValido,
  emailExist,
  usuarioExistById
}