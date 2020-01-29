import { Socket } from 'socket.io';
import { userList } from '../classes/user-list';
import { User } from '../classes/user';

// Listado de usuarios conectados
export const connectedUserList = new userList;

// Agregamos nuevo ususario a listado de usuarios conectados
export const conectarCliente = ( cliente: Socket ) => {

    const user = new User( cliente.id );
    connectedUserList.addUser( user );

}



export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        connectedUserList.deleteUser( cliente.id ); 
    });
}

// Escuchar mensaje
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('mensaje',(payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', payload);

        // Emitir evento a todos los usuarios conectados
        // this.io tiene la referencia de todos los clientes conectados
        io.emit('mensaje-nuevo', payload);

    }); 
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('configurar-usuario',(payload: { nombre: string }, callback: Function ) => {
        
        // Actualizamos nombre de usuario
        connectedUserList.updateNameUser( cliente.id, payload.nombre );
        
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        })
    }); 
}