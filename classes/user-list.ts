import { User } from "./user";

export class userList {

    private userList: User[] = [];

    constructor() {}

    // Agregar nuevo usuario
    public addUser(user: User) {
        this.userList.push(user);
        console.log(this.userList);
        return user;
    }

    // Actualizar nombre de usuario
    public updateNameUser(id: string, name: string) {
        
        for( let user of this.userList ) {

            if ( user.id === id ) {
                user.name = name;
                break;
            }

        }

        console.log('Actualizando nombre de usuario');
        console.log(this.userList);
    }

    // Obtener listado de usuarios conectados
    public getUserList() {
        return this.userList.filter(user => user.name !== 'sin-nombre');
    } 

    // Obtener un usuario
    public getUser( id: string ) {
        return this.userList.find( user => user.id === id );
    }

    // Obtener listado de usuarios conectados a una sala en particular
    public getRoomUserList( room: string ) {
        return this.userList.filter( user => user.room === room );
    }

    // Eliminar un usuario
    public deleteUser( id: string ) {
        const tempUser = this.getUser( id );
        this.userList = this.userList.filter (user => user.id !== id);
        return tempUser;
    }

}