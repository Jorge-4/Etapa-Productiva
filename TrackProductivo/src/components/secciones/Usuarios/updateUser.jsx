import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import axiosClient from "../../../configs/axiosClient";
import GlobalAlert from "../../componets_globals/GlobalAlert";
import GlobalModal from "../../componets_globals/GlobalModal";

export const UpdateUser = ({ user, onUpdateSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    identificacion: "",
    nombres: "",
    correo: "",
    telefono: "",
    password: "",
    rol: "",
    cargo: "",
    municipio: "",
    tipo: "",
    sede: "",
    area: "",
    estado: ""
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (value) {
      setError("");
    }
  };

  const handleOpenModal = () => {
    setUserData({...user, password: ""});
    setIsOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData.nombres || !userData.correo || !userData.telefono) {
      setError("Todos los campos son obligatorios, excepto la contraseña si no desea cambiarla.");
      return;
    }

    try {
      const dataToSend = {...userData};
      if (!dataToSend.password) {
        delete dataToSend.password;
      }
      
      const response = await axiosClient.put("/auth/me", dataToSend);
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Perfil actualizado correctamente.");
      setIsOpen(false);
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      GlobalAlert.error("Hubo un error al actualizar el perfil. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={handleOpenModal} className="max-w-fit">
        Actualizar Perfil
      </Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        title="Actualizar Perfil de Usuario"
        children={
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Input
                id="identificacion"
                name="identificacion"
                type="text"
                label="Identificación"
                placeholder="Ingrese la identificación"
                value={userData.identificacion}
                onChange={handleInputChange}
                required
              />
              <Input
                id="nombres"
                name="nombres"
                type="text"
                label="Nombres"
                placeholder="Ingrese los nombres"
                value={userData.nombres}
                onChange={handleInputChange}
                required
              />
              <Input
                id="correo"
                name="correo"
                type="email"
                label="Correo"
                placeholder="Ingrese el correo"
                value={userData.correo}
                onChange={handleInputChange}
                required
              />
              <Input
                id="telefono"
                name="telefono"
                type="text"
                label="Teléfono"
                placeholder="Ingrese el teléfono"
                value={userData.telefono}
                onChange={handleInputChange}
                required
              />
              <Input
                id="password"
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Ingrese una nueva contraseña para mas seguridad"
                value={userData.password}
                onChange={handleInputChange}
              />

              {error && <p className="text-red-500">{error}</p>}
              <Button color="primary" type="submit">
                Actualizar
              </Button>
            </div>
          </form>
        }
        footer={() => (
          <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
            Cerrar
          </Button>
        )}
      />
    </div>
  );
};

export default UpdateUser;