import { coneccionBD, desconeccionBD } from "../data/index.js";

const ObtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const db = coneccionBD();
    db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [parseInt(id)], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: "error al conseguir los datos del usuario" });
        } else {
            desconeccionBD(db);
            const  {password: _, ...datosUsuario } = result[0]
            res.status(200).send(datosUsuario);
            // res.status(200).send(datosUsuario);
        };
    });
};

export default ObtenerUsuarioPorId;