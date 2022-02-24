const express = require("express");
var cors = require('cors')

class Server {
    constructor() {
        this.app        = express();
        this.port       = process.env.PORT;
        this.usurioPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    middlewares() {
        //Uso de CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usurioPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;