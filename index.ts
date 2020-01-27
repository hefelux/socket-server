import Server from "./classes/server";
import { SERVER_PORT } from "./global/environment";
import router from "./routes/routes";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();
//BodyParser para leer mejor el cuerpo del POST generando un json
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de servicios
server.app.use('/', router);

server.start(() => {    
    console.log(`Servidor correindo en el puerto ${ SERVER_PORT }`);
});