
import bcrypt from 'bcryptjs';

import { coneccionBD, desconeccionBD } from "../data/index.js"

const ActualizarUsuarioBD = (req, res) => {

    const { email, password, ...datosParaActualizar } = req.body;

    const db = coneccionBD()
    let datosActualizados = {}

    db.query('SELECT * FROM usuarios WHERE usuarios.email = ?', [email], async (err, result) => {
        if (err) {
            desconeccionBD();
            res.status(404).json({ err: 'error al buscar el usuario' })
        } else {
            const isValid = await bcrypt.compare(password, result[0].password);
            if (!isValid) {
                res.status(404).json({ err: 'error de validación de usuario' });
            } else {
                db.beginTransaction()
                try {

                    const arrayConModificaciones = Object.keys(datosParaActualizar).filter(key => {
                        const value = datosParaActualizar[key]
                        return value !== null && value !== undefined && value !== ''
                    })
                    arrayConModificaciones.forEach(key => {
                        console.log('result', key);
                        if (key === 'fechaActual') {
                            datosParaActualizar[key] = new Date(datosParaActualizar[key]).toISOString().slice(0, 19).replace('T', ' ')
                        }
                        const query = `UPDATE usuarios SET ${key} = ? WHERE email = ?`;
                        const value = [datosParaActualizar[key], email]

                        db.query(query, value, (err, result) => {
                            if (err) {
                                res.status(404).json({ err: err });
                            } else {

                            }



                        })
                    })
                    db.commit()
                    db.query('SELECT * FROM usuarios WHERE usuarios.email = ?', [email], async (err, result) => {
                        if (err) {
                            desconeccionBD();
                            res.status(404).json({ err: 'error al buscar el usuario' })
                        } else {
                            datosActualizados = {
                                usuario: `${result[0].nombre}, ${result[0].apellido}`,
                                imageUser: result[0].foto,
                                id_usuario: result[0].id_usuario
                            }
                            res.status(200).json(datosActualizados)
                        }
                    })
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