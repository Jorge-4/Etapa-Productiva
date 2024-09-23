import React from 'react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TableFichas from "../components/secciones/Fichas/tableFichas";
import TableHorarios from "../components/secciones/Fichas/Horarios/tableHorarios";

function FichasPage() {
  return ( 
    <>
    <div className="flex min-h-screen flex-col m-10">
        <Tabs aria-label="Options">
            <Tab key="fichas" title="fichas">
              <TableFichas />
            </Tab>
            <Tab key="horarios" title="horarios">
              <TableHorarios />
            </Tab>
        </Tabs>
    </div>
  </>
 );
}


export default FichasPage