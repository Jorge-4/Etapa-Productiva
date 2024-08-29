import { Router } from "express";
import { validar , getUserInfo , validarToken, updateUser } from "../controllers/seguridad.controller.js";

const rutaSeguridad = Router();

rutaSeguridad.post("/validate", validar);
rutaSeguridad.get("/me",validarToken, getUserInfo);
rutaSeguridad.put("/me",validarToken, updateUser);

export default rutaSeguridad;