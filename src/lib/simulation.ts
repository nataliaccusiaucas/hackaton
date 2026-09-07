export type Distrito = {
  id: string;
  nombre: string;
  proyecto: string;
  precio: number;
  m2: number;
  mantenimiento: number;
  arbitrios: number;
};

export const DISTRITOS: Distrito[] = [
  {
    id: "jesus-maria",
    nombre: "Jesús María",
    proyecto: "Residencial Bosque Verde",
    precio: 349000,
    m2: 62,
    mantenimiento: 180,
    arbitrios: 55,
  },
  {
    id: "surco",
    nombre: "Santiago de Surco",
    proyecto: "Condominio Alameda Sur",
    precio: 412000,
    m2: 71,
    mantenimiento: 240,
    arbitrios: 78,
  },
  {
    id: "miraflores",
    nombre: "Miraflores",
    proyecto: "Torre Malecón 360",
    precio: 585000,
    m2: 78,
    mantenimiento: 320,
    arbitrios: 96,
  },
  {
    id: "magdalena",
    nombre: "Magdalena del Mar",
    proyecto: "Edificio Mar Azul",
    precio: 328000,
    m2: 58,
    mantenimiento: 165,
    arbitrios: 52,
  },
  {
    id: "san-miguel",
    nombre: "San Miguel",
    proyecto: "Parque Central Living",
    precio: 298000,
    m2: 55,
    mantenimiento: 150,
    arbitrios: 48,
  },
];

export const PRECIO_COCHERA = { ninguna: 0, simple: 22000, doble: 38000 } as const;
export type Cochera = keyof typeof PRECIO_COCHERA;
export const PRECIO_DEPOSITO = 9500;
export const PRECIO_MALLAS = 1450;

export type SimInput = {
  dni: string;
  distritoId: string;
  edad: number;
  cochera: Cochera;
  deposito: boolean;
  mallas: boolean;
};

export const soles = (n: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

/** DNI par = sin propiedades en SUNARP (apto Bono Verde) — simulación demo */
export function calificaBono(dni: string) {
  const digits = dni.replace(/\D/g, "");
  if (digits.length < 8) return true;
  return Number(digits[digits.length - 1]) % 2 === 0;
}

export function calcular(input: SimInput) {
  const distrito = (DISTRITOS.find((d) => d.id === input.distritoId) ?? DISTRITOS[0]) as Distrito;
  const apto = calificaBono(input.dni);

  const adicionales = PRECIO_COCHERA[input.cochera] + (input.deposito ? PRECIO_DEPOSITO : 0);
  const precioLista = distrito.precio + adicionales;

  const bonoVerde = apto ? 5900 : 0;
  const bbp = apto ? 26400 : 0;
  const subsidio = bonoVerde + bbp;

  const pctInicial = apto ? 0.075 : 0.1;
  const cuotaInicial = precioLista * pctInicial;

  // Gastos notariales y registrales
  const escritura = 1350;
  const sunarp = Math.round(precioLista * 0.0035) + 45;
  const estudioTitulos = 480;
  const tasacion = 390;
  const notariales = escritura + sunarp + estudioTitulos + tasacion;

  const desembolsoInicial = cuotaInicial + notariales;

  // Plazo real ajustado por edad (tope 75 años al final del crédito)
  const plazoAnios = Math.max(5, Math.min(25, 75 - input.edad));
  const financiado = Math.max(0, precioLista - subsidio - cuotaInicial);
  const tea = apto ? 0.089 : 0.098;
  const i = Math.pow(1 + tea, 1 / 12) - 1;
  const n = plazoAnios * 12;
  const cuotaBase = (financiado * i) / (1 - Math.pow(1 + i, -n));
  // Seguro de desgravamen sube con la edad
  const tasaDesgravamen = 0.00028 + Math.max(0, input.edad - 30) * 0.000018;
  const desgravamen = financiado * tasaDesgravamen;
  const seguroInmueble = precioLista * 0.00025;
  const cuotaMensual = cuotaBase + desgravamen + seguroInmueble;

  const mantenimiento =
    distrito.mantenimiento +
    (input.cochera === "simple" ? 35 : input.cochera === "doble" ? 60 : 0) +
    (input.deposito ? 20 : 0);

  const servicios = apto ? 210 : 265; // ahorro ecológico en vivienda verde
  const gasNatural = 45;
  const tcol = cuotaMensual + mantenimiento + servicios + gasNatural + distrito.arbitrios;

  const areaUtilSinMuros = Math.round(distrito.m2 * 0.86);
  const bonoNegociacion = Math.round(Math.min(12000, precioLista * 0.028));

  return {
    distrito,
    apto,
    precioLista,
    adicionales,
    bonoVerde,
    bbp,
    subsidio,
    pctInicial,
    cuotaInicial,
    escritura,
    sunarp,
    estudioTitulos,
    tasacion,
    notariales,
    desembolsoInicial,
    plazoAnios,
    financiado,
    tea,
    cuotaMensual,
    desgravamen,
    mantenimiento,
    servicios,
    gasNatural,
    arbitrios: distrito.arbitrios,
    tcol,
    areaUtilSinMuros,
    bonoNegociacion,
    mallas: input.mallas ? PRECIO_MALLAS : 0,
  };
}

export type SimResult = ReturnType<typeof calcular>;

export function mensajeWhatsApp(input: SimInput, r: SimResult, cita?: string) {
  return [
    "Hola, quiero aplicar al *Bono Directo de Cierre*. Esta es mi simulación completa:",
    "",
    `*DNI/CE:* ${input.dni || "por confirmar"}`,
    `*Proyecto:* ${r.distrito.proyecto} — ${r.distrito.nombre} (${r.distrito.m2} m²)`,
    `*Edad:* ${input.edad} años → plazo real ${r.plazoAnios} años`,
    `*Estado SUNARP:* ${r.apto ? "Cero propiedades registradas — APTO Bono Mivivienda Verde" : "Con propiedad registrada — crédito hipotecario tradicional"}`,
    "",
    `*Precio de lista:* ${soles(r.precioLista)}`,
    `*Subsidios:* Bono Verde ${soles(r.bonoVerde)} + BBP ${soles(r.bbp)}`,
    `*Cuota inicial (${Math.round(r.pctInicial * 100)}%):* ${soles(r.cuotaInicial)}`,
    `*Gastos notariales y registrales:* ${soles(r.notariales)}`,
    `*Desembolso inicial real:* ${soles(r.desembolsoInicial)}`,
    "",
    `*Cuota mensual ajustada por edad:* ${soles(r.cuotaMensual)}`,
    `*TCOL (costo total de vivir):* ${soles(r.tcol)} / mes`,
    "",
    `*Adicionales:* cochera ${input.cochera}, depósito ${input.deposito ? "sí" : "no"}, mallas de seguridad ${input.mallas ? "sí" : "no"}`,
    cita ? `*Visita agendada:* ${cita}` : "",
    "",
    `Solicito el descuento exclusivo de hasta ${soles(r.bonoNegociacion)}. Ya envié mis datos, por favor no los pidan de nuevo.`,
  ]
    .filter(Boolean)
    .join("\n");
}
