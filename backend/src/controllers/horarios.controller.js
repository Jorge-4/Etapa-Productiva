import { pool } from "../database/conexion.js";

export const listarHorarios = async (req, res) => {
    try {
        let sql = `SELECT h.*, f.*, a.*
        FROM horarios h
        INNER JOIN fichas f ON h.ficha = f.codigo
        INNER JOIN ambientes a ON h.ambiente = a.id_ambiente`;

        const [results] = await pool.query(sql);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({
                message: 'No hay actividades registradas'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor: ' + error
        });
    }
};