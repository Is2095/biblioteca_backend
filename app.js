
import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routes/index.js'

const PORT = process.env.PORT || 3001;

const app = express();


app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.disable('x-powered-by');
app.use(express.static('public'))

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
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

app.use('/api', router);    

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto: ${PORT}`);
})

export default app;