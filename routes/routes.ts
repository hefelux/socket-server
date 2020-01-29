import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'GET LISTO!!'
    })
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    // Mandar mensaje a todos los usuarios
    // Necesitamos instancias nuestro servidor de socket
    const server = Server.instance;
    const payload = {
        de: de,
        cuerpo: cuerpo
    }

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    })
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    // Necesitamos instancias nuestro servidor de socket
    const server = Server.instance;
    const payload = {
        de: de,
        cuerpo: cuerpo
    }
    // Mandar mensaje a un solo usuario
    server.io.in(id).emit('mensaje-privado', payload);
    
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
});

export default router;