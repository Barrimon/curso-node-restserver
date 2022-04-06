// const Role = require('../models/role');
// const Usuario = require('../models/usuario')
const { Role, Usuario, Categoria, Producto } = require('../models');
const { modelName } = require('../models/categoria');

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

const categoriaExistById = async (id) => {
  const existCategoria = await Categoria.findById(id)
  if (!existCategoria) {
    throw new Error(`La categoria con el Id: ${id} no existe`);
  }
}

const categoriaExistByName = async (nombre = '') => {
  nombre = nombre.toUpperCase();
  const existeCategoria = await Categoria.findOne({ nombre });
  if (existeCategoria) {
    throw new Error(`La categoria con el nombre: ${nombre} ya existe`);
  }
}

const productoExistById = async (id) => {
  const existProducto = await Producto.findById(id)
  if (!existProducto) {
    throw new Error(`El producto con el Id: ${id} no existe`);
  }
}

const productoExistByName = async (nombre = '') => {
  nombre = nombre.toUpperCase();
  const existeProducto = await Producto.findOne({ nombre });
  if (existeProducto) {
    throw new Error(`El producto con el nombre: ${nombre} ya existe`);
  }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(`La coleccion ${coleccion} no es permitida, [${colecciones}]`)
  }
  return true;
}

module.exports = {
  esRolValido,
  emailExist,
  usuarioExistById,
  categoriaExistById,
  categoriaExistByName,
  productoExistByName,
  productoExistById,
  coleccionesPermitidas
}