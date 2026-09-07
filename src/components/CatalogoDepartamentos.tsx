import { useState } from "react";
import { BedDouble, Bath, Maximize2, Building2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Departamento = {
  id: string;
  modelo: string;
  dormitorios: number;
  banos: number;
  areaTotal: number;
  areaTechada: number;
  precio: number;
  piso: string;
  plano: string;
  dimensiones: {
    ambiente: string;
    medida: string;
  }[];
};

type Props = {
  departamentos: Departamento[];
};

const formatoSoles = (cantidad: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(cantidad);

export function CatalogoDepartamentos({ departamentos }: Props) {
  const dormitoriosDisponibles = [
    ...new Set(departamentos.map((departamento) => departamento.dormitorios)),
  ];

  const [dormitorios, setDormitorios] = useState(dormitoriosDisponibles[0] ?? 1);

  const departamentosFiltrados = departamentos.filter(
    (departamento) => departamento.dormitorios === dormitorios,
  );

  const [seleccionadoId, setSeleccionadoId] = useState(departamentos[0]?.id ?? "");

  const seleccionado =
    departamentosFiltrados.find((departamento) => departamento.id === seleccionadoId) ??
    departamentosFiltrados[0];

  const [inicialPorcentaje, setInicialPorcentaje] = useState(10);
  const [anos, setAnos] = useState(20);
  const [tasaAnual, setTasaAnual] = useState(8.5);

  if (!seleccionado) {
    return null;
  }

  const inicial = seleccionado.precio * (inicialPorcentaje / 100);
  const montoFinanciado = seleccionado.precio - inicial;
  const cantidadCuotas = anos * 12;
  const tasaMensual = tasaAnual / 100 / 12;

  const cuotaMensual =
    tasaMensual === 0
      ? montoFinanciado / cantidadCuotas
      : (montoFinanciado * tasaMensual * Math.pow(1 + tasaMensual, cantidadCuotas)) /
        (Math.pow(1 + tasaMensual, cantidadCuotas) - 1);

  const totalCredito = cuotaMensual * cantidadCuotas;
  const intereses = totalCredito - montoFinanciado;

  const cambiarDormitorios = (cantidad: number) => {
    setDormitorios(cantidad);

    const primerResultado = departamentos.find(
      (departamento) => departamento.dormitorios === cantidad,
    );

    if (primerResultado) {
      setSeleccionadoId(primerResultado.id);
    }
  };

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10">
          <Badge variant="outline">Departamentos disponibles</Badge>

          <h2 className="mt-3 text-3xl font-bold">Elige el departamento ideal</h2>

          <p className="mt-2 text-muted-foreground">
            Selecciona la cantidad de dormitorios para conocer los modelos, precios, planos y cuotas
            estimadas.
          </p>
        </div>

        {/* Selector de dormitorios */}
        <div className="mb-8 flex flex-wrap gap-3">
          {dormitoriosDisponibles.map((cantidad) => (
            <Button
              key={cantidad}
              type="button"
              variant={dormitorios === cantidad ? "navy" : "outline"}
              onClick={() => cambiarDormitorios(cantidad)}
            >
              <BedDouble className="size-4" />
              {cantidad} {cantidad === 1 ? "dormitorio" : "dormitorios"}
            </Button>
          ))}
        </div>

        {/* Departamentos filtrados */}
        <div className="mb-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {departamentosFiltrados.map((departamento) => {
            const activo = seleccionado.id === departamento.id;

            return (
              <button
                key={departamento.id}
                type="button"
                onClick={() => setSeleccionadoId(departamento.id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  activo
                    ? "border-primary bg-primary/5 shadow-md"
                    : "bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Modelo</p>

                    <h3 className="text-xl font-bold">{departamento.modelo}</h3>
                  </div>

                  {activo && <Badge>Seleccionado</Badge>}
                </div>

                <div className="mt-5 grid gap-2 text-sm">
                  <p className="flex items-center gap-2">
                    <BedDouble className="size-4 text-primary" />
                    {departamento.dormitorios} dormitorios
                  </p>

                  <p className="flex items-center gap-2">
                    <Bath className="size-4 text-primary" />
                    {departamento.banos} baños
                  </p>

                  <p className="flex items-center gap-2">
                    <Maximize2 className="size-4 text-primary" />
                    {departamento.areaTotal} m² de área total
                  </p>

                  <p className="flex items-center gap-2">
                    <Building2 className="size-4 text-primary" />
                    Piso {departamento.piso}
                  </p>
                </div>

                <p className="mt-5 text-xl font-bold text-primary">
                  {formatoSoles(departamento.precio)}
                </p>
              </button>
            );
          })}
        </div>

        {/* Plano y dimensiones */}
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border bg-card">
            <div className="border-b p-5">
              <h3 className="text-2xl font-bold">Plano del modelo {seleccionado.modelo}</h3>

              <p className="text-sm text-muted-foreground">
                Plano referencial con distribución y dimensiones.
              </p>
            </div>

            <div className="bg-white p-5">
              <img
                src={seleccionado.plano}
                alt={`Plano del departamento ${seleccionado.modelo}`}
                className="mx-auto max-h-[520px] w-full object-contain"
              />
            </div>

            <div className="border-t p-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {seleccionado.dimensiones.map((dimension) => (
                  <div key={dimension.ambiente} className="rounded-xl bg-muted p-3">
                    <p className="text-xs text-muted-foreground">{dimension.ambiente}</p>

                    <p className="font-semibold">{dimension.medida}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Simulador */}
          <article className="rounded-2xl border bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Calculator className="size-6" />
              </span>

              <div>
                <h3 className="text-2xl font-bold">Simula tu financiamiento</h3>

                <p className="text-sm text-muted-foreground">Cuota hipotecaria referencial</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <label htmlFor="inicial" className="font-medium">
                    Cuota inicial
                  </label>

                  <strong>{inicialPorcentaje}%</strong>
                </div>

                <input
                  id="inicial"
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={inicialPorcentaje}
                  onChange={(event) => setInicialPorcentaje(Number(event.target.value))}
                  className="w-full accent-primary"
                />

                <p className="mt-1 text-sm text-muted-foreground">{formatoSoles(inicial)}</p>
              </div>

              <div>
                <label htmlFor="anos" className="mb-2 block font-medium">
                  Plazo del crédito
                </label>

                <select
                  id="anos"
                  value={anos}
                  onChange={(event) => setAnos(Number(event.target.value))}
                  className="h-11 w-full rounded-xl border bg-background px-3"
                >
                  <option value={5}>5 años</option>
                  <option value={10}>10 años</option>
                  <option value={15}>15 años</option>
                  <option value={20}>20 años</option>
                  <option value={25}>25 años</option>
                  <option value={30}>30 años</option>
                </select>
              </div>

              <div>
                <label htmlFor="tasa" className="mb-2 block font-medium">
                  Tasa anual referencial
                </label>

                <input
                  id="tasa"
                  type="number"
                  min="1"
                  max="30"
                  step="0.1"
                  value={tasaAnual}
                  onChange={(event) => setTasaAnual(Number(event.target.value))}
                  className="h-11 w-full rounded-xl border bg-background px-3"
                />
              </div>

              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <p className="text-sm opacity-80">Cuota mensual estimada</p>

                <p className="mt-1 text-4xl font-bold">{formatoSoles(cuotaMensual)}</p>

                <p className="mt-2 text-sm opacity-80">Durante {anos} años</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-xs text-muted-foreground">Monto financiado</p>

                  <p className="font-bold">{formatoSoles(montoFinanciado)}</p>
                </div>

                <div className="rounded-xl bg-muted p-4">
                  <p className="text-xs text-muted-foreground">Intereses estimados</p>

                  <p className="font-bold">{formatoSoles(intereses)}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Simulación referencial. La cuota final dependerá de la tasa aprobada por la entidad
                financiera, seguros y evaluación crediticia.
              </p>

              <Button variant="cta" size="lg" className="w-full">
                Solicitar evaluación
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
