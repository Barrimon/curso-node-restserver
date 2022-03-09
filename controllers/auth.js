const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {

  const { correo, password } = req.body;

  try {

    //Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if(!usuario){
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - correo'
      })
    }

    //Validando si esta activo
    if(!usuario.estado){
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - estado:false'
      })
    }

    //Validar contraseña
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validarPassword){
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - password'
      })
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
};

module.exports = {
  login
}