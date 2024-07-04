
import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from "path";
import jwt from 'jsonwebtoken';

import { inicializacionBD } from "./src/data/index.js";
import router from './src/routes/index.js';
import { Auth_User }from "./src/middleware/auth_user.js";

const PORT = process.env.PORT || 3001;
const { PALABRASECRETA } = process.env

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
// app.use(cors({
//     origin: 'https://biblioteca-backend-y7iu.vercel.app',
//     optionsSuccessStatus: 200 
//  }));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Origin', '');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE, PATCH'
    );
    res.header('X-Total-Count', "1000");
    next();
});

app.use((_req, _res, next) => {
    inicializacionBD()
    next()
});
// app.use('/verificarToken', (req, res, next) => {

//     const token = req.cookies.access_token;
//     if (!token) {
//        return res.status(403).json({ err: 'sesión terminada' })
//     } else {
//         const datosUsuarioSesion = jwt.verify(token, PALABRASECRETA)
//         return res.status(200).json(datosUsuarioSesion)
//     }
// })

app.use('/api', router);
app.use('/protegida', Auth_User, (req, res) => {
    res.status(200).json({message: 'acceso autorizado'})
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto: ${PORT}`);
});

export default app;