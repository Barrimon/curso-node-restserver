const { response, request } = require("express");
const { body } = require("express-validator");
const { Producto } = require('../models');

const crearProducto = async (req, res = response) => {
  // const nombre = req.body.nombre.toUpperCase();
  const { estado, usuario, ...body } = req.body;
  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`
    })
  }

  //Generar la data a Guardar
  data = {
    ...body,
    nombre : body.nombre.toUpperCase(),
    usuario: req.usuario._id
  };

  const prodcuto = new Producto(data);

  //Salvar en BD
  await prodcuto.save();

  res.status(201).json(prodcuto);

}

const obtenerProductos = async(req = request, res = response) => { 
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.find(query).countDocuments(),
    Producto.find(query)
      .populate('usuario','nombre')
      .populate('categoria','nombre')
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({
    total,
    productos
  });
}

const obtenerProducto = async(req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate('categoria', 'nombre')
    .populate('usuario', 'nombre');
  res.status(200).json(producto);
}

const actualizarProducto = async(req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();

  }
  data.usuario = req.usuario._id;
  
  const producto = await Producto.findByIdAndUpdate(id, data, {
    returnOriginal: false
  });

  res.status(200).json(producto);
}

const borrarProducto = async(req, res) => {
  const { id } = req.params;

  //Borrado lógico
  const producto  = await Producto.findByIdAndUpdate(id, { estado: false },{
    returnOriginal: false
  });
  res.status(200).json(producto);
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
}