const { response, request } = require("express");
const { Categoria } = require('../models');

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`
    })
  }

  //Generar la data a Guardar
  data = {
    nombre,
    usuario: req.usuario._id
  };

  const categoria = new Categoria(data);

  //Salvar en BD
  await categoria.save();

  res.status(201).json(categoria);

}

const obtenerCategorias = async(req = request, res = response) => { 
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.find(query).countDocuments(),
    Categoria.find(query)
      .populate('usuario','nombre')
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({
    total,
    categorias
  });
}

const obtenerCategoria = async(req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
  res.status(200).json(categoria);
}

const actualizarCategoria = async(req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  
  const categoria = await Categoria.findByIdAndUpdate(id, data, {
    returnOriginal: false
  });

  res.status(200).json(categoria);
}

const borrarCategoria = async(req, res) => {
  const { id } = req.params;

  //Borrado lógico
  const categoria  = await Categoria.findByIdAndUpdate(id, { estado: false },{
    returnOriginal: false
  });
  res.status(200).json(categoria);
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
}