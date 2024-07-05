
import bcrypt from 'bcryptjs';

import { coneccionBD, desconeccionBD } from "../data/index.js"

const ActualizarUsuarioBD = (req, res) => {

    const { email, password, ...datosParaActualizar } = req.body;

    const db = coneccionBD()

    db.query('SELECT * FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD();
            res.status(404).json({ err: 'error al buscar el usuario' })
        } else {
            const isValid = bcrypt.compare(password, result[0].password);
            if (!isValid) {
                res.status(404).json({ err: 'error de validación de usuario' });
            } else {
                db.beginTransaction()
                try {
                    Object.keys(datosParaActualizar).forEach(key => {
                        if (key === 'fechaActual') {
                            datosParaActualizar[key] = new Date(datosParaActualizar[key]).toISOString().slice(0, 19).replace('T', ' ')
                        }
                        const query = `UPDATE usuarios SET ${key} = ? WHERE email = ?`;
                        const value = [datosParaActualizar[key], email]

                        db.query(query, value, (err, result) => {
                            if (err) {
                                res.status(404).json({ err: err });
                            }
                        })
                    })
                    db.commit()
                    res.status(200).json({ message: 'actualización correcta', datosParaActualizar})
                } catch (error) {
                    res.status(500).json({ err: 'error al actualizar los datos del usuario' })
                }
                finally {

                }

            }
        }
    })
}

export default ActualizarUsuarioBD