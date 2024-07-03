
import bcrypt from 'bcryptjs';

import { coneccionBD, desconeccionBD } from "../data/index.js";

const BuscarUsuarioPorEmailBD = (req, res) => {

    const { email, password } = req.body;

    const db = coneccionBD();

    db.query('SELECT * FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: 'error al buscar el usuario' })
        } else {
            desconeccionBD(db);
            if(result.length === 0) {
                res.status(200).json({err: "no se encontró el usuario"})
            }else {
                const isValid = bcrypt.compare(password, result[0].password)
                console.log(password, isValid, result[0].password);
                if(!isValid) {
                    res.status(404).json({err: 'error de validación de usuario'})
                }else {
                    const {password: _, ...userDatos} = result[0]
                    res.status(200).json(userDatos);
                }
            }
        }
    });
};

export default BuscarUsuarioPorEmailBD;