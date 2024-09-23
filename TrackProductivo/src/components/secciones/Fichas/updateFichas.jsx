import React, { useState, useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../../configs/axiosClient";
import GlobalAlert from "../../componets_globals/GlobalAlert";
import GlobalModal from "../../componets_globals/GlobalModal";

const ActualizarFicha = ({ item, onClose, refreshData }) => {
  const [fichaData, setFichaData] = useState({
    codigo: "",
    inicio_ficha: "",
    fin_lectiva: "",
    fin_ficha: "",
    programa: "",
    sede: "",
    estado: ""
  });
  const [programas, setProgramas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      const formatDate = (dateString) => dateString ? new Date(dateString).toISOString().split('T')[0] : "";

      setFichaData({
        ...item,
        inicio_ficha: formatDate(item.inicio_ficha),
        fin_lectiva: formatDate(item.fin_lectiva),
        fin_ficha: formatDate(item.fin_ficha),
        programa: item.programa.toString()
      });
    }
    fetchProgramas();
  }, [item]);

  const fetchProgramas = async () => {
    try {
      const response = await axiosClient.get("/programa/listar");
      setProgramas(response.data);
    } catch (error) {
      console.error("Error al obtener los programas:", error);
      GlobalAlert.error("Hubo un error al obtener los programas.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFichaData({ ...fichaData, [name]: value });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fichaData.inicio_ficha || !fichaData.fin_lectiva || !fichaData.programa || !fichaData.sede || !fichaData.estado) {
      setError("Todos los campos son obligatorios excepto Fin de Ficha");
      return;
    }
    try {
      console.log('Enviando datos al servidor:', fichaData);
      const response = await axiosClient.put(`/fichas/actualizar/${fichaData.codigo}`, {
        inicio_ficha: fichaData.inicio_ficha,
        fin_lectiva: fichaData.fin_lectiva,
        fin_ficha: fichaData.fin_ficha || null,
        programa: parseInt(fichaData.programa),
        sede: fichaData.sede,
        estado: fichaData.estado
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Ficha actualizada correctamente.");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error al actualizar la ficha:", error);
      console.error("Respuesta del servidor:", error.response?.data);
      GlobalAlert.error("Error al actualizar la ficha: " + (error.response?.data?.message || error.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Ficha"
      children={
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Código de Ficha"
            value={fichaData.codigo}
            isReadOnly
          />
          <Input
            label="Inicio de Ficha"
            type="date"
            name="inicio_ficha"
            value={fichaData.inicio_ficha}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Fin Lectiva"
            type="date"
            name="fin_lectiva"
            value={fichaData.fin_lectiva}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Fin de Ficha"
            type="date"
            name="fin_ficha"
            value={fichaData.fin_ficha}
            onChange={handleInputChange}
          />
          <Select
            label="Programa"
            placeholder="Seleccione un programa"
            name="programa"
            selectedKeys={fichaData.programa ? [fichaData.programa] : []}
            onChange={(e) => handleInputChange({ target: { name: 'programa', value: e.target.value } })}
            required
          >
            {programas.map((programa) => (
              <SelectItem key={programa.id_programa.toString()} value={programa.id_programa.toString()}>
                {programa.nombre_programa}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Sede"
            placeholder="Seleccione una sede"
            name="sede"
            selectedKeys={fichaData.sede ? [fichaData.sede] : []}
            onChange={(e) => handleInputChange({ target: { name: 'sede', value: e.target.value } })}
            required
          >
            <SelectItem key="centro" value="centro">Centro</SelectItem>
            <SelectItem key="yamboro" value="yamboro">Yamboro</SelectItem>
          </Select>
          <Select
            label="Estado"
            placeholder="Seleccione el estado"
            name="estado"
            selectedKeys={fichaData.estado ? [fichaData.estado] : []}
            onChange={(e) => handleInputChange({ target: { name: 'estado', value: e.target.value } })}
            required
          >
            <SelectItem key="Lecttiva" value="Lecttiva">Lecttiva</SelectItem>
            <SelectItem key="Electiva" value="Electiva">Electiva</SelectItem>
            <SelectItem key="Finalizado" value="Finalizado">Finalizado</SelectItem>
          </Select>
          {error && <p className="text-red-500">{error}</p>}
          <Button color="primary" type="submit">
            Actualizar Ficha
          </Button>
        </form>
      }
      footer={() => (
        <Button color="danger" variant="light" onPress={onClose}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default ActualizarFicha;