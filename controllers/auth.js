const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, img, nombre } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      //Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true,
        estado: true,
        rol:'USER_ROL'
      };
      usuario = new Usuario(data);
      console.log({usuario});
      const saved = await usuario.save();
      console.log(saved);
    }

    //Si el  usuario en BD
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      })
    }

      //Generar JWT
    const token = await generarJWT(usuario.id);
    
    res.json({
      usuario,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se puedo verificar'
    });
  }

};

module.exports = {
  login,
  googleSignIn
}