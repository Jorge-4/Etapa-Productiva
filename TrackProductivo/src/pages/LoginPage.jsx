import React, { useState, useEffect } from 'react';
import logo from "../../public/LOGOTIC.png";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axiosClient from '../configs/axiosClient';

export const LoginPage = () => {
  const [correo, setcorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [correoFocused, setcorreoFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axiosClient.post('/auth/validate', { correo, password });
      const { token, user } = response.data;
      
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/home");
      } else {
        setError("Error al iniciar sesión: No se recibió token o usuario.");
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setError("Error al iniciar sesión: " + (error.response?.data?.detail || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <div className='bg-gradient-to-b from-lime-300 to-lime-600 w-[100%] h-auto flex justify-center items-center'>
        <img className='w-[95%] pt-31' src="index.svg" alt="estadisticas" />
      </div>
      <div className="flex flex-col justify-center w-full px-6 py-12 sm:py-24">
        <div className="relative w-full max-w-md mx-auto   p-8">
          <div className="text-center flex flex-col items-center">
            <img className="w-32 mb-6" src={logo} alt="logo" />
            <h4 className="mb-4 text-2xl font-semibold">TrackProductivo</h4>
            <p className="mb-6 text-gray-600">Por favor, ingrese a su cuenta</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  className="peer w-full rounded border border-gray-300 bg-white px-3 py-2 placeholder-transparent focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500"
                  id="correo"
                  placeholder="correo"
                  value={correo}
                  onChange={(e) => setcorreo(e.target.value)}
                  onFocus={() => setcorreoFocused(true)}
                  onBlur={() => setcorreo ? setcorreoFocused(true) : setcorreoFocused(false)}
                  onClick={() => setcorreoFocused(true)}
                  aria-label="correo"
                />
                <label
                  htmlFor="correo"
                  className={`absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all ${correo || correoFocused ? 'transform -translate-y-4 text-lime-500' : ''}`}
                >
                  correo
                </label>
              </div>
            </div>
            <div className="mb-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="peer w-full rounded border border-gray-300 bg-white px-3 py-2 placeholder-transparent focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPassword ? setPasswordFocused(true) : setPasswordFocused(false)}
                  onClick={() => setPasswordFocused(true)}
                  aria-label="Password"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <label
                  htmlFor="password"
                  className={`absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all ${password || passwordFocused ? 'transform -translate-y-4 text-lime-500' : ''}`}
                >
                  Password
                </label>
              </div>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-6">
              <button
                className="w-full px-6 py-2.5 rounded bg-lime-500 text-white text-sm font-medium leading-normal shadow-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </div>
            <div className="flex justify-between items-center mb-6">
              <a href="#!" className="text-sm text-lime-500 hover:underline">¿Has olvidado tu contraseña?</a>
              <a href="#!" className="text-sm text-lime-500 hover:underline">¿No tienes una cuenta?</a>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};
