
import 'dotenv/config'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { coneccionBD, desconeccionBD } from "../data/index.js";

const BuscarUsuarioPorEmailBD = (req, res) => {

    const { email, password } = req.body;
    const { PALABRASECRETA } = process.env

    const db = coneccionBD();

    db.query('SELECT * FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: 'error al buscar el usuario' })
        } else {
            desconeccionBD(db);
            if (result.length === 0) {
                res.status(200).json({ err: "no se encontró el usuario" })
            } else {
                const isValid = bcrypt.compare(password, result[0].password)
                if (!isValid) {
                    res.status(404).json({ err: 'error de validación de usuario' })
                } else {
                    const { password: _, ...userDatos } = result[0]
                    const token = jwt.sign(
                        { id: userDatos.id_usuario, nombre: userDatos.nombre, foto: userDatos.foto }, 
                        PALABRASECRETA, 
                        {
                            expiresIn: '2m'
                            // expiresIn: '1h'
                        }
                    )
                    res
                    .status(200)
                    .cookie('access_token', token, {
                        httpOnly: true, // la cookie solo se puede acceder ene el servidor
                        secure: process.env.NODE_ENV === 'produccion', // la cookie solo se puede acceer en https
                        sameSite: 'strict', // la cookie solo se puede acceder en e lmismo dominio
                        maxAge: 1000 * 2 * 60 // la cookie tiene una tiempo de validez de 1 hora
                        // maxAge: 1000 * 60 * 60 // la cookie tiene una tiempo de validez de 1 hora
                    }) 
                    .json(userDatos);
                }
            }
        }
    });
};

export default BuscarUsuarioPorEmailBD;