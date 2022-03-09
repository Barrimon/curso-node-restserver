const express = require("express");
var cors = require('cors')

const {dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app        = express();
        this.port       = process.env.PORT || 8000;
        this.usurioPath = '/api/usuarios';
        this.authPath   = '/api/auth';

        //Connectar a la base de datos
        this.conectarDB();

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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usurioPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`);
        });
    }

    async conectarDB() {
        await dbConnection();
    }
}

module.exports = Server;