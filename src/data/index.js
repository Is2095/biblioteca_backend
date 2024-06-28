
import mysql from 'mysql2';
import "dotenv/config";

const PASSWORD = process.env.PASSWORD;

export const coneccionBD = () => {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'biblioteca_virtual',
        password: PASSWORD
    });

    db.connect((err) => {
        if (err) {
            console.log('error al conectarse a la base de datos');
            return;
        } else {
            console.log('coneción exitosa a la base de datos: biblioteca_virtual');
        }
    })
    return db;
}
export const desconeccionBD = (db) => {
    db.end((err) => {
        if(err) {
            throw Error('error al desconecatar la base de datos', err)
        } else {
            console.log('Base de datos desconectada');
        }
    })

}


