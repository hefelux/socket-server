import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets'; 

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    // Usando patrón singleton para que no existan instancian duplicadas de Server
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        // socket necesita recibir la configuración del servidor Http que está corriendo
        this.io = socketIO(this.httpServer);
        this.listeningSockets();

    }
    // Para obtener instancia de server si es que ya existe o creamos una instancia nueva
    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private listeningSockets() {
        console.log('Escuchando conexiones sockets');
        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado');

            // Cuando mandamosun mensaje desde angular
            socket.mensaje(cliente, this.io);
            // Desconectado
            socket.desconectar(cliente);

        })

    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }

}