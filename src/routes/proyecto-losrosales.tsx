import { createFileRoute } from "@tanstack/react-router";

import { ProyectoDetalle } from "@/components/ProyectoDetalle";
import { CatalogoDepartamentos } from "@/components/CatalogoDepartamentos";
import { getProyecto } from "@/lib/proyectos";
import { getDepartamentos } from "@/lib/departamentos-proyectos";

const proyecto = getProyecto("/proyecto-losrosales");
const departamentos = getDepartamentos("losrosales");

export const Route = createFileRoute("/proyecto-losrosales")({
  head: () => ({
    meta: [
      {
        title: `${proyecto.nombre} | Transparencia Radical`,
      },
      {
        name: "description",
        content: proyecto.descripcion,
      },
    ],
  }),

  component: PaginaProyecto,
});

function PaginaProyecto() {
  return (
    <>
      <ProyectoDetalle proyecto={proyecto} />
      <CatalogoDepartamentos departamentos={departamentos} />
    </>
  );
}
