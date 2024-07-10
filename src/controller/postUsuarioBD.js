
import { coneccionBD, desconeccionBD } from "../data/index.js";
import bcrypt from 'bcryptjs';

const GuardarUsuarioBD = async (req, res) => {

    const db = coneccionBD();
    const { nombre, apellido, edad, email, password, fechaActual, provincia } = req.body;
    const dateActual = new Date(fechaActual).toISOString().slice(0, 19).replace('T', ' ');
    const edadNumber = parseInt(edad);

<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(password, 10)
console.log(hashedPassword, 'contraseña hash');
=======
    const hashedPassword = await bcrypt.hash(password, 10);

>>>>>>> main
    db.query('SELECT usuarios.id_usuario FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: 'error al buscar la información del usuario' });
        } else {
            if (result.length === 0) {
                db.query('INSERT IGNORE INTO usuarios (nombre, apellido, edad, email, password, fechaActual, provincia) VALUES (?, ?, ?, ?, ?, ?, ?);', [nombre, apellido, edadNumber, email, hashedPassword, dateActual, provincia], (err, result) => {
                    if (err) {
                        desconeccionBD(db);
                        res.status(404).json({ err: 'error al guardar los datos del usuario' });
                    } else {
                        // console.log('usuario registrado');
                        const idUsuario = result.insertId;
                        desconeccionBD(db);
<<<<<<< HEAD
                        res.redirect('http://localhost:3001/login/index.html');
                    }
=======
                        // res.redirect('http://localhost:3001/login/index.html');
                        res.redirect('https://biblioteca-backend-y7iu.vercel.app/login/index.html');
                    };
>>>>>>> main
                });
            } else {
                desconeccionBD(db);
                console.log('usuario existente');
                res.status(404).json({ err: 'usuario existente' });
            };
        };
    });
};

export default GuardarUsuarioBD;