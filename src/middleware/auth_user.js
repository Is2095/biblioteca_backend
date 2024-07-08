
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { PALABRASECRETA } = process.env;

export const Auth_User = (req, res, next) => {

    const token = req.cookies.access_token;
    req.session = { usuario: null };

    if (!token) {
        return res.status(403).json({ err: 'Acceso no autorizado' });
    } else {
        try {
            const datosUsuarioSesion = jwt.verify(token, PALABRASECRETA);
            req.session.usuario = datosUsuarioSesion;
        } catch (error) {
            console.log(error, 'error en auth_user');
        };
    };
    next();
}
