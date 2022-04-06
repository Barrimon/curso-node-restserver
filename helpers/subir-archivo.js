const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'], carpeta = '') => {

  return new Promise((resolve, reject) => {
   
    const { archivo  }  = files;
    const nombreCortado = archivo.name.split('.');
    const extension     = nombreCortado[nombreCortado.length - 1];
  
    //Validar Extension permitida
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida, las extensiones permitidas son: ${extensionesValidas}`);
    };
    
    const nombreTemp = uuidv4() + '.' + extension;
  
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
  
      resolve( nombreTemp);
    });
  });
}


module.exports = {
  subirArchivo
}