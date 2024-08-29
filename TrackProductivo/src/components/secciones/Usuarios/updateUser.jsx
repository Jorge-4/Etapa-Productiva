import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import axiosClient from "../../../configs/axiosClient";
import GlobalAlert from "../../componets_globals/GlobalAlert";
import GlobalModal from "../../componets_globals/GlobalModal";

export const UpdateUser = () => {
  const [isOpen, setIsOpen] = useState(false); // Manejo del estado del modal
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

  // Función para manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (value) {
      setError("");
    }
  };

  // Función para abrir el modal y cargar datos actuales del usuario
  const handleOpenModal = async () => {
    try {
      const response = await axiosClient.get('/auth/me');
      setUserData(response.data.user); // Asegúrate de que los datos se carguen correctamente
      setIsOpen(true);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      GlobalAlert.error('No se pudieron cargar los datos del usuario. ' + (error.response?.data?.message || 'Error del servidor.'));
    }
  };

  // Función para manejar la actualización de los datos del usuario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si algún campo requerido está vacío
    if (!userData.nombres || !userData.correo || !userData.telefono || !userData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axiosClient.put("/auth/me", userData); // Asegúrate de usar el endpoint correcto
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Perfil actualizado correctamente.");
      setIsOpen(false); // Cierra el modal después de enviar la petición
      window.location.reload();
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
                id="municipio"
                name="municipio"
                type="text"
                label="Municipio"
                placeholder="Ingrese el municipio"
                value={userData.municipio}
                onChange={handleInputChange}
              />
          
              <Input
                id="estado"
                name="estado"
                type="text"
                label="Estado"
                placeholder="Ingrese el estado"
                value={userData.estado}
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
