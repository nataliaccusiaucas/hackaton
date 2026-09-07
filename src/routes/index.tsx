import { CatalogoProyectos } from "@/components/CatalogoProyectos";
import { useAccesibilidad } from "@/hooks/use-accesibilidad";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Eye, Accessibility, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AccesibilidadProvider } from "@/components/AccesibilidadProvider";
import { PreEvaluacion } from "@/components/PreEvaluacion";
import { ResultadosDashboard } from "@/components/ResultadosDashboard";
import { CierreWhatsApp } from "@/components/CierreWhatsApp";
import { Agendador } from "@/components/Agendador";
import { KioscoAccesible } from "@/components/KioscoAccesible";
import { calcular, mensajeWhatsApp, soles, type Cochera } from "@/lib/simulation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Costo real transparente de tu depa | Truth-First PropTech" },
      {
        name: "description",
        content:
          "Simula en 15 segundos tu cuota ajustada por edad, Bono Mivivienda Verde, gastos notariales y el costo total de vivir. Cero sorpresas de cierre.",
      },
      { property: "og:title", content: "Tu depa con costo real y cero sorpresas de cierre" },
      {
        property: "og:description",
        content:
          "Cuota por edad, Bono Mivivienda Verde, notaría, SUNARP y TCOL en un solo simulador transparente.",
      },
    ],
  }),
  component: () => (
    <AccesibilidadProvider>
      <Pagina />
    </AccesibilidadProvider>
  ),
});

function Pagina() {
  const { kiosco, toggle } = useAccesibilidad();

  const [dni, setDni] = useState("");
  const [distritoId, setDistritoId] = useState("jesus-maria");
  const [edad, setEdad] = useState(34);
  const [cochera, setCochera] = useState<Cochera>("simple");
  const [deposito, setDeposito] = useState(false);
  const [mallas, setMallas] = useState(false);
  const [simulado, setSimulado] = useState(false);
  const [cita, setCita] = useState<string>();

  const input = { dni, distritoId, edad, cochera, deposito, mallas };
  const r = calcular(input);
  const mensaje = mensajeWhatsApp(input, r, cita);

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b superficie-vidrio">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-navy)] text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <span className="truncate font-display text-base font-bold">Transparencia Radical</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Label htmlFor="kiosco-toggle" className="hidden text-sm sm:block">
              <Accessibility className="mr-1 inline size-4" /> Modo kiosco
            </Label>
            <Switch
              id="kiosco-toggle"
              aria-label="Activar modo kiosco de accesibilidad"
              checked={kiosco}
              onCheckedChange={() => toggle("kiosco")}
            />
          </div>
        </div>
      </header>

      <main>
        {kiosco ? (
          <div className="mx-auto max-w-6xl px-4 py-8">
            <KioscoAccesible r={r} mensaje={mensaje} />
          </div>
        ) : (
          <>
            <CatalogoProyectos />
            {/* Hero */}
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 bg-[image:var(--gradient-navy)] opacity-[0.92]" />
              <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 text-primary-foreground lg:grid-cols-2 lg:py-20">
                <div className="min-w-0">
                  <Badge className="bg-success text-success-foreground">Truth-First PropTech</Badge>
                  <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
                    Tu nuevo departamento con costo real transparente y cero sorpresas de cierre.
                  </h1>
                  <p className="mt-4 max-w-xl text-base opacity-90 sm:text-lg">
                    Descubre en tiempo real tu cuota ajustada a tu edad, calificación a Bono
                    Mivivienda Verde y gastos notariales.
                  </p>
                  <ul className="mt-6 grid gap-2 text-sm opacity-90 sm:grid-cols-2">
                    <li>✅ Validación SUNARP en línea</li>
                    <li>✅ Notaría y registros desglosados</li>
                    <li>✅ Cuota real según tu edad</li>
                    <li>✅ Costo mensual de vivir (TCOL)</li>
                  </ul>
                  <Button
                    variant="cta"
                    size="lg"
                    className="mt-8 h-auto min-h-11 w-full whitespace-normal py-3 sm:w-auto"
                    onClick={() =>
                      document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <ArrowDown className="size-5" /> Ver mi desglose transparente
                  </Button>
                </div>

                <div className="min-w-0 text-foreground">
                  <PreEvaluacion
                    dni={dni}
                    setDni={setDni}
                    distritoId={distritoId}
                    setDistritoId={setDistritoId}
                    edad={edad}
                    setEdad={setEdad}
                    onSimular={() => {
                      setSimulado(true);
                      document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Dashboard */}
            <section id="resultados" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold sm:text-3xl">Tu desglose transparente</h2>
                  <p className="text-sm text-muted-foreground">
                    {simulado
                      ? `Simulación para DNI ${dni || "sin registrar"} · ${r.distrito.proyecto}`
                      : "Vista previa con datos de ejemplo. Ingresa tu DNI para personalizarla."}
                  </p>
                </div>
                <div className="rounded-2xl border bg-card px-4 py-3 text-right">
                  <p className="text-xs text-muted-foreground">Gasto mensual real (TCOL)</p>
                  <p className="text-2xl font-bold text-primary">{soles(r.tcol)}</p>
                </div>
              </div>

              <ResultadosDashboard
                r={r}
                cochera={cochera}
                setCochera={setCochera}
                deposito={deposito}
                setDeposito={setDeposito}
                mallas={mallas}
                setMallas={setMallas}
              />
            </section>

            {/* Jale de conversión */}
            <section className="mx-auto max-w-6xl px-4 pb-14">
              <CierreWhatsApp r={r} mensaje={mensaje} />
            </section>

            {/* Agendador */}
            <section className="mx-auto max-w-6xl px-4 pb-14">
              <Agendador onAgendar={setCita} />
            </section>

            {/* Kiosco preview */}
            <section className="mx-auto max-w-6xl px-4 pb-20">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-secondary p-6">
                <p className="flex min-w-0 items-center gap-2 text-sm">
                  <Eye className="size-5 shrink-0 text-primary" />
                  ¿Estás en una feria o usas una tablet a altura de silla de ruedas? Activa el
                  kiosco inclusivo con letra grande y QR.
                </p>
                <Button variant="navy" className="min-h-11" onClick={() => toggle("kiosco")}>
                  Activar modo kiosco
                </Button>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          <p>
            Los montos son estimados referenciales calculados con tasas y aranceles vigentes; se
            confirman con la evaluación crediticia y la constancia registral final.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Transparencia Radical PropTech</p>
        </div>
      </footer>
    </div>
  );
}
