import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios'
    }
    
    constructor(){
        // leventar express
        this.app = express();
        // definir el puerto
        this.port = process.env.PORT || '8086';
        //conectar con la base de datos
        this.dbConnection();
        // definir los middlewares
        this.middlewares();
        // definir las rutas
        this.routes();
    }

    // Conectar bases de datos
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares(){
        // CORS
        this.app.use(cors()); // peticiones cross domain
        // Lectura del body
        this.app.use(express.json());
        // Carpeta pública
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPath.usuarios, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }
}

export default Server;