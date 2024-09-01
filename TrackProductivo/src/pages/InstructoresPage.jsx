import React from 'react'
//import registerFichas from '../components/secciones/Fichas/registerFichas';
import GlobalTable from '../components/componets_globals/GlobalTable';
//import updateFichas from '../components/secciones/Fichas/updateFichas';
//import deleteFichas from '../components/secciones/Fichas/deleteFichas'; // Asegúrate de importar correctamente el componente DeleteArea
import CardComponent from '../components/CardComponent';


function InstructoresPage() {
  const columns = [
    'identificacion',
    'nombres',
    'correo',
    'telefono',
    'rol',
    'cargo',
    'tipo',
    'sede',
    'area',
    'estado',

    
  ];



  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>

          <CardComponent title="Instructores Registrados"  />
          {/* <RegisterArea /> */}
          <GlobalTable 
            columns={columns} 
            dataEndpoint="/personas/listarI" 
            //updateComponent={UpdateArea} 
            //deleteComponent={DeleteArea} 
          />
        </div>

      </main>
    </>
  );
};

export default InstructoresPage