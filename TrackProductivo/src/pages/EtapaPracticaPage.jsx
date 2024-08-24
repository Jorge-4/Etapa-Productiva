import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
// import TableAprendices from "../organisms/TableAprendices";
// import TableInstructores from "../organisms/TableInstructores";
import TableCoordiSoft from "../components/Table/TableCoordiSoft";
function EtapaPracticaPage() {
    return ( 
        <>
        <main className='w-full p-3'>
        en esta pagina se muestra la tabla de la estapa practica osea los aprencices y de la tabla de de la empresa 
        </main>
        <div className="flex min-h-screen flex-col m-10">
            <Tabs aria-label="Options">
                <Tab key="aprendiz" title="EtapaPractica">
                    {/* <TableAprendices /> */}
                </Tab>
                <Tab key="instructor" title="Empresa">
                    <TableCoordiSoft />
                </Tab>
            </Tabs>
        </div>
      </>
     );
}

export default EtapaPracticaPage;

