import React, { useState, useEffect } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../../../configs/axiosClient';
import GlobalAlert from '../../componets_globals/GlobalAlert';
import GlobalModal from '../../componets_globals/GlobalModal';

const ActualizarEmpresa = ({ item, onClose, refreshData }) => {
    const [datosEmpresa, setDatosEmpresa] = useState({
      id_empresa: '',
      razon_social: '',
      direccion: '',
      telefono: '',
      correo: '',
      municipio: '',
      jefe_inmediato: '',
      estado: '',
    });
    const [municipios, setMunicipios] = useState([]);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (item) {
        setDatosEmpresa({
          id_empresa: item.id_empresa.toString(),
          razon_social: item.razon_social || '',
          direccion: item.direccion || '',
          telefono: item.telefono || '',
          correo: item.correo || '',
          municipio: item.municipio ? item.municipio.toString() : '',
          jefe_inmediato: item.jefe_inmediato || '',
          estado: item.estado || '',
        });
      }
      obtenerMunicipios();
    }, [item]);
  
    const obtenerMunicipios = async () => {
      try {
        const response = await axiosClient.get('/municipios/listar');
        setMunicipios(response.data);
      } catch (error) {
        console.error('Error al obtener los municipios:', error);
        GlobalAlert.error('Hubo un error al obtener los municipios.');
      }
    };
  
    const manejarCambioDeEntrada = (e) => {
      const { name, value } = e.target;
      setDatosEmpresa((prevData) => {
        const nuevosData = { ...prevData, [name]: value };
        console.log('Datos actualizados:', nuevosData);
        return nuevosData;
      });
      setError('');
    };
  
    const manejarEnvio = async (event) => {
      event.preventDefault();
      console.log('Iniciando actualización de empresa. Datos actuales:', datosEmpresa);
  
      if (
        !datosEmpresa.razon_social ||
        !datosEmpresa.direccion ||
        !datosEmpresa.telefono ||
        !datosEmpresa.correo ||
        !datosEmpresa.municipio ||
        !datosEmpresa.jefe_inmediato ||
        !datosEmpresa.estado
      ) {
        setError('Todos los campos son obligatorios');
        console.error('Error de validación: Campos incompletos', datosEmpresa);
        return;
      }
  
      try {
        console.log(`Actualizando empresa con ID: ${datosEmpresa.id_empresa}`);
        const datosAEnviar = {
          id_empresa: parseInt(datosEmpresa.id_empresa),
          razon_social: datosEmpresa.razon_social,
          direccion: datosEmpresa.direccion,
          telefono: datosEmpresa.telefono,
          correo: datosEmpresa.correo,
          municipio: parseInt(datosEmpresa.municipio),
          jefe_inmediato: datosEmpresa.jefe_inmediato,
          estado: datosEmpresa.estado === 'Activo' ? 'Activo' : 'Inactivo',
        };
        console.log('Datos a enviar:', datosAEnviar);
  
        const response = await axiosClient.put(`/empresas/actualizar/${datosEmpresa.id_empresa}`, datosAEnviar);
        console.log('Respuesta del servidor:', response.data);
        GlobalAlert.success('Empresa actualizada correctamente.');
        refreshData(); // Llamar a la función refreshData
        onClose();
      } catch (error) {
        console.error('Error completo:', error);
        console.error('Respuesta del servidor:', error.response?.data);
        console.error('Estado de la respuesta:', error.response?.status);
        console.error('Headers de la respuesta:', error.response?.headers);
        const mensajeDeError = error.response?.data?.message || error.message || 'Error desconocido';
        GlobalAlert.error(`Error al actualizar la empresa: ${mensajeDeError}`);
      }
    };
  
    return (
      <GlobalModal
        isOpen={true}
        onOpenChange={onClose}
        title="Actualizar Empresa"
        children={
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Razón Social"
            name="razon_social"
            value={empresaData.razon_social}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Dirección"
            name="direccion"
            value={empresaData.direccion}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Teléfono"
            name="telefono"
            value={empresaData.telefono}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Correo"
            name="correo"
            value={empresaData.correo}
            onChange={handleInputChange}
            required
          />
          <Select
            label="Municipio"
            name="municipio"
            selectedKeys={empresaData.municipio ? [empresaData.municipio] : []}
            onChange={(e) => handleInputChange({ target: { name: 'municipio', value: e.target.value } })}
            required
          >
            {municipios.map((municipio) => (
              <SelectItem key={municipio.id_municipio.toString()} textValue={municipio.nombre}>
                {municipio.nombre_mpio}
              </SelectItem>
            ))}
          </Select>
          <Input
            label="Jefe Inmediato"
            name="jefe_inmediato"
            value={empresaData.jefe_inmediato}
            onChange={handleInputChange}
            required
          />
          <Select
            label="Estado"
            name="estado"
            selectedKeys={empresaData.estado ? [empresaData.estado] : []}
            onChange={(e) => handleInputChange({ target: { name: 'estado', value: e.target.value } })}
            required
          >
            <SelectItem key="Activo" value="Activo">Activo</SelectItem>
            <SelectItem key="Inactivo" value="Inactivo">Inactivo</SelectItem>
          </Select>
          {error && <p className="text-red-500">{error}</p>}
          <Button color="primary" type="submit">
            Actualizar Empresa
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

export default UpdateEmpresa;