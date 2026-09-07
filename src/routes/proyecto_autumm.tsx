import { createFileRoute } from "@tanstack/react-router";
import { ProyectoDetalle } from "@/components/ProyectoDetalle";
import { getProyecto } from "@/lib/proyectos";

const proyecto = getProyecto("/proyecto_autumm");

export const Route = createFileRoute("/proyecto_autumm")({
  head: () => ({
    meta: [
      { title: proyecto.nombre + " | Transparencia Radical" },
      { name: "description", content: proyecto.descripcion },
    ],
  }),
  component: PaginaProyecto,
});

function PaginaProyecto() {
  return <ProyectoDetalle proyecto={proyecto} />;
}
