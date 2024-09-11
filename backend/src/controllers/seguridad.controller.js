// Importar módulos necesarios
import { pool } from "./../database/conexion.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Middleware para validar el token
export const validarToken = async (req, res, next) => {
  try {
    // Obtener el token desde el encabezado Authorization
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Token es requerido" });
    }

    const token = authHeader.split(" ")[1]; // Extraer el token después de 'Bearer'

    jwt.verify(token, process.env.AUT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: "Token no válido" });
      } else {
        req.user = decoded.rows[0]; // Guardamos la información del usuario decodificada en req.user
        next();
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Error del servidor: " + error });
  }
};

// Endpoint para validar las credenciales y obtener el token
export const validar = async (req, res) => {
  try {
    const { correo, password } = req.body;
    let sql = `SELECT * FROM personas WHERE correo = ?`;
    const [rows] = await pool.query(sql, [correo]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Correo incorrecto" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ rows }, process.env.AUT_SECRET, {
      expiresIn: process.env.AUT_EXPIRE,
    });

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error });
  }
};

// Endpoint para obtener la información del usuario autenticado
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.identificacion; // Suponemos que 'identificacion' es el campo de identificación del usuario

    // Consulta SQL para obtener los datos del usuario
    let sql = `
      SELECT p.*, m.*, a.*
      FROM personas p
      INNER JOIN municipios m ON p.municipio = m.id_municipio
      INNER JOIN areas a ON p.area = a.id_area
      WHERE identificacion = ?`;
    const [rows] = await pool.query(sql, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devolver la información del usuario
    res.status(200).json({ user: rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error });
  }
};

// Endpoint para actualizar la información del usuario autenticado
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.identificacion; //  'identificacion' es el campo de identificación del usuario
    const {
      nombres,
      correo,
      telefono,
      password,
      rol,
      cargo,
      municipio,
      tipo,
      sede,
      area,
      estado,
    } = req.body; // Datos del usuario a actualizar enviados en el cuerpo de la solicitud

    // Validar que los datos necesarios están presentes
    if (!nombres || !correo || !rol || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    // Hashear la nueva contraseña si se proporciona
    const hashedPassword = await bcrypt.hash(password, 10);

    // Consulta SQL para actualizar los datos del usuario
    let sql = `
      UPDATE personas 
      SET nombres = ?, correo = ?, telefono = ?, password = ?, rol = ?, cargo = ?, municipio = ?, tipo = ?, sede = ?, area = ?, estado = ?
      WHERE identificacion = ?`;
    const [result] = await pool.query(sql, [
      nombres,
      correo,
      telefono,
      hashedPassword,
      rol,
      cargo,
      municipio,
      tipo,
      sede,
      area,
      estado,
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devolver una respuesta de éxito
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error });
  }
};


