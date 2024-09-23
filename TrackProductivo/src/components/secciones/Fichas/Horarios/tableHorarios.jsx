import React from 'react';
//import registerFichas from '../components/secciones/Fichas/registerFichas';
import GlobalTable from '../../../componets_globals/GlobalTable';
//import updateFichas from '../components/secciones/Fichas/updateFichas';
//import deleteFichas from '../components/secciones/Fichas/deleteFichas'; // Asegúrate de importar correctamente el componente DeleteArea



function TableHorariosPage() {
  const columns = [

    'dia',
    'horas',
    'hora_inicio',
    'hora_fin',
    'ficha',
    'nombre_amb',
    'estado'

  ];



  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>

          {/* <RegisterArea /> */}
          <GlobalTable 
            columns={columns} 
            dataEndpoint="/horarios/listar" 
            //updateComponent={UpdateArea} 
            //deleteComponent={DeleteArea} 
          />
        </div>

      </main>
    </>
  );
};


export default TableHorariosPage