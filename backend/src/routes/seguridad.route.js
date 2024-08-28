import { Router } from "express";
import { validar , getUserInfo , validarToken } from "../controllers/seguridad.controller.js";

const rutaSeguridad = Router();

rutaSeguridad.post("/validate", validar);
rutaSeguridad.get("/me",validarToken, getUserInfo);

export default rutaSeguridad;