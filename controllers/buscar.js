const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types
const { Usuario, Categoria, Producto} = require('../models')

const coleccionesPermitidas = [
  'categorias',
  'productos',
  'roles',
  'usuarios'
];

const buscarUsuario = async(termino = '', res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino)
    return res.json({
      results: (usuario) ? [usuario] : []
    });
  }
  
  const regex = new RegExp(termino, 'i');
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }]
  });
   res.json({
    results: usuarios
  });
};


const buscarCategoria = async (termino = '', res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const categoria = await Categoria.findById(termino)
    return res.json({
      results: (categoria) ? [categoria] : []
    });
  }
  
  const regex = new RegExp(termino, 'i');
  const categoria = await Categoria.find({ nombre: regex, estado: true });
   res.json({
    results: categoria
  });
};

const buscarProducto = async (termino = '', res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const producto = await Producto.findById(termino).populate('categoria', 'nombre');
    return res.json({
      results: (producto) ? [producto] : []
    });
  }
  
  const regex = new RegExp(termino, 'i');
  const producto = await Producto.find({
    $or: [{ nombre: regex },{ description: regex }],
    $and: [{ estado: true }]
  }).populate('categoria', 'nombre');
  
   res.json({
    results: producto
  });
};

const buscar = (req = request, res = response) => {

  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `La colecciones permitidas son: ${coleccionesPermitidas}`
    });
  }
  console.log(coleccion);
  switch (coleccion) {
    case 'categorias':
      buscarCategoria(termino,res);
      break
    case 'productos':
      buscarProducto(termino,res);
      break
    case 'usuarios':
      buscarUsuario(termino,res);
      break
    default:
      res.status(500).json({
        msg: 'Se me olvido hacer esta busqueda'
      })
      break;
  }


  // res.json({
  //   coleccion, termino
  // })
};


module.exports = {
  buscar
}