import React from 'react';
//import registerFichas from '../components/secciones/Fichas/registerFichas';
import GlobalTable from '../../componets_globals/GlobalTable';
//import updateFichas from '../components/secciones/Fichas/updateFichas';
//import deleteFichas from '../components/secciones/Fichas/deleteFichas'; // Asegúrate de importar correctamente el componente DeleteArea
import CardComponent from '../../CardComponent';


function TableEmpresas() {
  const columns = [
    'razon_social',
    'direccion',
    'telefono',
    'correo',
    'municipio',
    'jefe_inmediato',
    'estado'
    
  ];



  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>

          <CardComponent title="Empresas Registradas"  />
          {/* <RegisterArea /> */}
          <GlobalTable 
            columns={columns} 
            dataEndpoint="/empresas/listar" 
            //updateComponent={UpdateArea} 
            //deleteComponent={DeleteArea} 
          />
        </div>

      </main>
    </>
  );
};


export default TableEmpresas