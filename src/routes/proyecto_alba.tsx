import { createFileRoute } from "@tanstack/react-router";

import { ProyectoDetalle } from "@/components/ProyectoDetalle";

import { CatalogoDepartamentos, type Departamento } from "@/components/CatalogoDepartamentos";

import { getProyecto } from "@/lib/proyectos";

const proyecto = getProyecto("/proyecto_alba");

const departamentos: Departamento[] = [
  {
    id: "alba-a1",
    modelo: "Alba A1",
    dormitorios: 1,
    banos: 1,
    areaTotal: 41,
    areaTechada: 37,
    precio: 289000,
    piso: "3 al 8",
    plano: "/planos/alba-1d-a1.png",
    dimensiones: [
      {
        ambiente: "Sala-comedor",
        medida: "4.50 × 3.20 m",
      },
      {
        ambiente: "Cocina",
        medida: "2.60 × 2.10 m",
      },
      {
        ambiente: "Dormitorio principal",
        medida: "3.20 × 3.00 m",
      },
      {
        ambiente: "Baño",
        medida: "2.10 × 1.50 m",
      },
      {
        ambiente: "Balcón",
        medida: "2.80 × 1.20 m",
      },
      {
        ambiente: "Lavandería",
        medida: "1.50 × 1.20 m",
      },
    ],
  },
  {
    id: "alba-a2",
    modelo: "Alba A2",
    dormitorios: 1,
    banos: 1,
    areaTotal: 45,
    areaTechada: 40,
    precio: 312000,
    piso: "9 al 15",
    plano: "/planos/alba-1d-a2.png",
    dimensiones: [
      {
        ambiente: "Sala-comedor",
        medida: "4.80 × 3.30 m",
      },
      {
        ambiente: "Cocina americana",
        medida: "2.80 × 2.20 m",
      },
      {
        ambiente: "Dormitorio principal",
        medida: "3.40 × 3.10 m",
      },
      {
        ambiente: "Baño",
        medida: "2.10 × 1.60 m",
      },
      {
        ambiente: "Balcón",
        medida: "3.20 × 1.30 m",
      },
      {
        ambiente: "Lavandería",
        medida: "1.60 × 1.20 m",
      },
    ],
  },
  {
    id: "alba-b1",
    modelo: "Alba B1",
    dormitorios: 2,
    banos: 2,
    areaTotal: 58,
    areaTechada: 53,
    precio: 368000,
    piso: "4 al 12",
    plano: "/planos/alba-2d-b1.png",
    dimensiones: [
      {
        ambiente: "Sala-comedor",
        medida: "5.20 × 3.40 m",
      },
      {
        ambiente: "Cocina",
        medida: "2.80 × 2.30 m",
      },
      {
        ambiente: "Dormitorio principal",
        medida: "3.40 × 3.10 m",
      },
      {
        ambiente: "Dormitorio secundario",
        medida: "3.00 × 2.70 m",
      },
      {
        ambiente: "Baño principal",
        medida: "2.20 × 1.50 m",
      },
      {
        ambiente: "Baño secundario",
        medida: "2.00 × 1.40 m",
      },
      {
        ambiente: "Balcón",
        medida: "3.20 × 1.20 m",
      },
    ],
  },
  {
    id: "alba-b2",
    modelo: "Alba B2",
    dormitorios: 2,
    banos: 2,
    areaTotal: 64,
    areaTechada: 58,
    precio: 399000,
    piso: "5 al 16",
    plano: "/planos/alba-2d-b2.png",
    dimensiones: [
      {
        ambiente: "Sala-comedor",
        medida: "5.50 × 3.50 m",
      },
      {
        ambiente: "Cocina",
        medida: "3.00 × 2.40 m",
      },
      {
        ambiente: "Dormitorio principal",
        medida: "3.60 × 3.20 m",
      },
      {
        ambiente: "Dormitorio secundario",
        medida: "3.10 × 2.80 m",
      },
      {
        ambiente: "Baño principal",
        medida: "2.20 × 1.60 m",
      },
      {
        ambiente: "Baño secundario",
        medida: "2.00 × 1.50 m",
      },
      {
        ambiente: "Balcón",
        medida: "3.60 × 1.30 m",
      },
    ],
  },
  {
    id: "alba-c1",
    modelo: "Alba C1",
    dormitorios: 3,
    banos: 2,
    areaTotal: 78,
    areaTechada: 71,
    precio: 469000,
    piso: "6 al 14",
    plano: "/planos/alba-3d-c1.png",
    dimensiones: [
      {
        ambiente: "Sala-comedor",
        medida: "5.80 × 3.60 m",
      },
      {
        ambiente: "Cocina",
        medida: "3.00 × 2.50 m",
      },
      {
        ambiente: "Dormitorio principal",
        medida: "3.60 × 3.20 m",
      },
      {
        ambiente: "Dormitorio 2",
        medida: "3.00 × 2.80 m",
      },
      {
        ambiente: "Dormitorio 3",
        medida: "2.90 × 2.70 m",
      },
      {
        ambiente: "Baño principal",
        medida: "2.30 × 1.60 m",
      },
      {
        ambiente: "Baño compartido",
        medida: "2.10 × 1.50 m",
      },
      {
        ambiente: "Balcón",
        medida: "3.80 × 1.30 m",
      },
    ],
  },
  {
    id: "alba-c2",
    modelo: "Alba C2",
    dormitorios: 3,
    banos: 2,
    areaTotal: 84,
    areaTechada: 76,
    precio: 509000,
    piso: "10 al 17",
    plano: "/planos/alba-3d-c2.png",
    dimensiones: [
      {
        ambiente: "Sala-comedor",
        medida: "6.10 × 3.80 m",
      },
      {
        ambiente: "Cocina cerrada",
        medida: "3.20 × 2.60 m",
      },
      {
        ambiente: "Dormitorio principal",
        medida: "3.80 × 3.30 m",
      },
      {
        ambiente: "Dormitorio 2",
        medida: "3.10 × 2.90 m",
      },
      {
        ambiente: "Dormitorio 3",
        medida: "3.00 × 2.80 m",
      },
      {
        ambiente: "Baño principal",
        medida: "2.40 × 1.70 m",
      },
      {
        ambiente: "Baño compartido",
        medida: "2.10 × 1.50 m",
      },
      {
        ambiente: "Balcón",
        medida: "4.20 × 1.40 m",
      },
    ],
  },
];

export const Route = createFileRoute("/proyecto_alba")({
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
