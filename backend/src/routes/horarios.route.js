import { Router } from "express";
import { listarHorarios } from "../controllers/horarios.controller.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const rutaHorarios = Router();

rutaHorarios.get("/listar", validarToken, listarHorarios);

export default rutaHorarios;