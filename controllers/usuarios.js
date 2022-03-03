const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.find(query).countDocuments(),
    Usuario.find(query)
      .skip(desde)
      .limit(Number(limite))
  ])

  res.json({
    total,
    usuarios
  });
}

const usuariosPost = (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Salvar en BD
  usuario.save();

  //Respuesta Satisfactoria
  res.status(201).json({
    msg: 'post API - Controlador',
    usuario
  });
}

const usuariosPut = async(req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findOneAndUpdate(id, resto, {
    returnOriginal: false
  });
console.log(usuario);
  res.json(usuario);
}

const usuariosDelete = async(req, res) => {
  const { id } = req.params;

  //Borrar fisicamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //Borrado lógico
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
}

const usuariosPatch =(req, res) => {
  res.json({
      msg: 'patch API - Controlador'
  });
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
}