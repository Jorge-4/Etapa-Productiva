import React from 'react';
import GlobalTable from '../../componets_globals/GlobalTable';
function TableEtapaPractica() {
  const columns = [
    'codigo',
    'inicio_ficha',
    'fin_lectiva',
    'fin_ficha',
    'programa',
    'sede',
    'estado'
    
  ];



  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>

          <GlobalTable 
            columns={columns} 
            dataEndpoint="/fichas/listar" 
          />
        </div>

      </main>
    </>
  );
};


export default TableEtapaPractica