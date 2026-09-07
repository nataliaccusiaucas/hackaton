export type Proyecto = {
  ruta: string;
  nombre: string;
  estado: string;
  direccion: string;
  distrito: string;
  areaDesde: string;
  precioDesde: string;
  dormitorios: string;
  entrega?: string;
  descripcion: string;
  areasComunes: readonly string[];
};

export const PROYECTOS = [
  {
    ruta: "/proyecto-losrosales",
    ...{
      nombre: "Los Rosales",
      estado: "Entrega inmediata",
      direccion: "Calle Los Rosales 358",
      distrito: "Santiago de Surco",
      areaDesde: "68 m²",
      precioDesde: "S/ 498,000",
      dormitorios: "2 y 3 dormitorios",
      entrega: "Entrega inmediata",
      descripcion:
        "Un edificio residencial exclusivo, rodeado de parques y diseñado para familias que buscan amplitud, seguridad y tranquilidad.",
      areasComunes: [
        "Lobby de doble altura",
        "Jardín interior",
        "Gimnasio",
        "Sala de reuniones",
        "Zona de parrillas",
        "Área para mascotas",
      ],
    },
  },
  {
    ruta: "/proyecto-santacatalina",
    ...{
      nombre: "Santa Catalina",
      estado: "En construcción",
      direccion: "Av. Canadá 1285",
      distrito: "La Victoria",
      areaDesde: "42 m²",
      precioDesde: "S/ 265,000",
      dormitorios: "1, 2 y 3 dormitorios",
      entrega: "Agosto de 2028",
      descripcion:
        "Un proyecto conectado con San Isidro y el centro de Lima, ideal para vivir o invertir gracias a su ubicación estratégica.",
      areasComunes: [
        "Lobby",
        "Coworking",
        "Gimnasio",
        "Sala de entretenimiento",
        "Zona de parrillas",
        "Terraza panorámica",
      ],
    },
  },
  {
    ruta: "/proyecto_alba",
    ...{
      nombre: "Alba",
      estado: "Preventa",
      direccion: "Av. Canadá 3891",
      distrito: "San Luis",
      areaDesde: "40.00 m²",
      precioDesde: "S/ 277,000",
      dormitorios: "1, 2 y 3 dormitorios",
      descripcion:
        "Departamentos modernos con excelente ubicación, distribución funcional y acabados de alta calidad.",
      areasComunes: [
        "Lobby de ingreso",
        "Gimnasio",
        "Zona de parrillas",
        "Sala de reuniones",
        "Terraza",
        "Estacionamiento para bicicletas",
      ],
    },
  },
  {
    ruta: "/proyecto_autumm",
    ...{
      nombre: "Autumn",
      estado: "En construcción",
      direccion: "Jr. Tacna 625",
      distrito: "Magdalena del Mar",
      areaDesde: "38 m²",
      precioDesde: "S/ 326,000",
      dormitorios: "1, 2 y 3 dormitorios",
      entrega: "Junio de 2028",
      descripcion:
        "Departamentos con diseño contemporáneo y ambientes cálidos, ubicados cerca de parques, comercios y el malecón.",
      areasComunes: [
        "Lobby",
        "Sala lounge",
        "Coworking",
        "Pet zone",
        "Lavandería",
        "Rooftop con parrillas",
      ],
    },
  },
  {
    ruta: "/proyecto_losalisos",
    ...{
      nombre: "Los Alisos",
      estado: "Preventa",
      direccion: "Av. Los Alisos 720",
      distrito: "Los Olivos",
      areaDesde: "55 m²",
      precioDesde: "S/ 238,000",
      dormitorios: "2 y 3 dormitorios",
      entrega: "Marzo de 2029",
      descripcion:
        "Un proyecto familiar con departamentos amplios y funcionales, ubicado cerca de colegios, centros comerciales y avenidas principales.",
      areasComunes: [
        "Jardín interior",
        "Zona de juegos para niños",
        "Sala de usos múltiples",
        "Zona de parrillas",
        "Gimnasio",
        "Estacionamiento para visitas",
      ],
    },
  },
  {
    ruta: "/proyecto_universitaria",
    ...{
      nombre: "Universitaria",
      estado: "En construcción",
      direccion: "Av. Universitaria 1120",
      distrito: "San Miguel",
      areaDesde: "45 m²",
      precioDesde: "S/ 279,000",
      dormitorios: "1, 2 y 3 dormitorios",
      entrega: "Octubre de 2027",
      descripcion:
        "Vive cerca de universidades, supermercados y centros comerciales en un proyecto diseñado para jóvenes, familias e inversionistas.",
      areasComunes: [
        "Coworking",
        "Sala de estudio",
        "Gimnasio",
        "Zona gamer",
        "Terraza",
        "Estacionamiento para bicicletas",
      ],
    },
  },
] as const satisfies readonly Proyecto[];

export function getProyecto(ruta: string): Proyecto {
  const proyecto = PROYECTOS.find((item) => item.ruta === ruta);
  if (!proyecto) throw new Error("Proyecto no encontrado: " + ruta);
  return proyecto;
}
