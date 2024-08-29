import React, { useEffect, useState } from 'react';
import axiosClient from '../configs/axiosClient';
import UpdateUser from '../components/secciones/Usuarios/updateUser';

const PerfilPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const response = await axiosClient.get('/auth/me'); 
        console.log('User data fetched successfully:', response.data);
        setUser(response.data.user); // Guarda los datos del usuario en el estado
        setError(null); // Resetea el error si la solicitud es exitosa
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        if (error.response) {
          console.error('Response error:', error.response);
          setError('No se pudo cargar los datos del usuario. ' + (error.response.data?.message || 'Error del servidor.'));
        } else {
          setError('Error de red o de servidor.');
        }
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/'; // Redirigir al login si no está autenticado
        }
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-20">
      <div className="mb-4 grid grid-cols-2">
        <div>
<h2 className="text-2xl font-bold text-gray-800 mb-2">{user.nombres}</h2>
        <p className="text-sm text-gray-500">{user.rol || 'Usuario'}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <UpdateUser user={user} />
          <UpdateUser user={user} />
          <span className=' text-red-600'> falta agregar el cambio de contraseña</span>
        </div>
      
        
      </div>

      <div className="grid grid-cols-2 gap-4"> 
        <div>
          <p className="text-gray-600 font-semibold">Identificación:</p>
          <p className="text-gray-800">{user.identificacion}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Correo:</p>
          <p className="text-gray-800">{user.correo}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Teléfono:</p>
          <p className="text-gray-800">{user.telefono}</p>
        </div>
   
        <div>
          <p className="text-gray-600 font-semibold">Cargo:</p>
          <p className="text-gray-800">{user.cargo}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Municipio:</p>
          <p className="text-gray-800">{user.municipio}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Tipo:</p>
          <p className="text-gray-800">{user.tipo}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Sede:</p>
          <p className="text-gray-800">{user.sede}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Área:</p>
          <p className="text-gray-800">{user.area}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Estado:</p>
          <p className="text-gray-800">{user.estado}</p>
        </div>
      </div>


    </div>
  );
};

export default PerfilPage;
