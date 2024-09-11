import React, { useState, useEffect, useCallback } from 'react';
import { User } from "@nextui-org/user";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../configs/axiosClient';

export const Navbar2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axiosClient.get('/auth/me');
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      setError('No se pudo cargar los datos del usuario.');
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getLinkClasses = (path) =>
    location.pathname === path 
      ? "text-lime-500 border-b-2 border-lime-500" 
      : "text-gray-600 dark:text-gray-300";

  const handleUserClick = () => {
    navigate('/perfil');
  };

  return (
    <nav className="sticky top-0 z-20 w-full bg-white shadow-md dark:bg-neutral-800">
      <Navbar className="bg-white dark:bg-neutral-800 rounded-md">
        <NavbarContent justify="start" className="px-4">
          <NavbarBrand className="mr-4 flex items-center">
            <p className="hidden sm:block font-bold text-xl text-gray-800 dark:text-white">
              TrackProductivo
            </p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4">
            <NavbarItem>
              <Link href="/home" className={getLinkClasses('/home')}>
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/instructores" aria-current="page" className={getLinkClasses('/instructores')}>
                Instructores
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/seguimientos" className={getLinkClasses('/seguimientos')}>
                Seguimientos
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center px-4" justify="end">
          <div className="ml-4">
            {loading ? (
              <div>Cargando usuario...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <User
                name={user.nombres}
                description={user.rol || 'Usuario'}
                avatarSrc="https://via.placeholder.com/150"
                bordered
                as="button"
                size="sm"
                color="primary"
                onClick={handleUserClick}
              />
            )}
          </div>
        </NavbarContent>
      </Navbar>
    </nav>
  );
};

export default Navbar2;