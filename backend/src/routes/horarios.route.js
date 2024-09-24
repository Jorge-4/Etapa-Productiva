import { Router } from "express";
import { ActualizarHorarios, CrearHorario, listarHorarios } from "../controllers/horarios.controller.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const rutaHorarios = Router();

rutaHorarios.get("/listar", validarToken, listarHorarios);
rutaHorarios.post("/registrar", validarToken, CrearHorario);
rutaHorarios.put("/actualizar/:id_horario", validarToken, ActualizarHorarios);
export default rutaHorarios;