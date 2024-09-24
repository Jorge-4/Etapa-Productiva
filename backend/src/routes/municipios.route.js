import { Router } from "express";
import { listarMunicipios } from "../controllers/municipios.controller.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const rutaMunicipios = Router();

rutaMunicipios.get("/listar", validarToken, listarMunicipios);

export default rutaMunicipios