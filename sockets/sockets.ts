import { Socket } from 'socket.io';

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('cliente Desconectado');
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