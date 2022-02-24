const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'No Name', apikey, page = 1, limit = 10 } = req.query;

  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apikey,
    page,
    limit
  });
}

const usuariosPost = (req, res) => {
  const {nombre, edad} = req.body;
  res.status(201).json({
    msg: 'post API - Controlador',
    nombre,
    edad
  });
}

const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: 'put API - Controlador',
    id
  });
}

const usuariosDelete = (req, res) => {
  res.json({
      msg: 'delete API - Controlador'
  });
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