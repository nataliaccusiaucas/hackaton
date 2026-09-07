import { MessageCircle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { soles, type SimResult } from "@/lib/simulation";

export function CierreWhatsApp({
  r,
  mensaje,
  telefono = "51987654321",
}: {
  r: SimResult;
  mensaje: string;
  telefono?: string;
}) {
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <section
      aria-labelledby="jale"
      className="overflow-hidden rounded-3xl bg-[image:var(--gradient-navy)] p-6 text-primary-foreground shadow-[var(--shadow-float)] sm:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-3 py-1 text-xs font-bold text-accent-foreground">
            <Gift className="size-4" /> Bono directo de cierre
          </span>
          <h2 id="jale" className="mt-4 text-2xl font-bold sm:text-4xl">
            Hasta {soles(r.bonoNegociacion)} de margen de negociación disponible
          </h2>
          <p className="mt-3 max-w-xl opacity-90">
            Envía tu simulación completa al asesor y aplica el descuento directo de cierre. Va con
            tu DNI, estado SUNARP, cuota por edad, TCOL y gastos notariales: nadie te volverá a
            pedir los mismos datos.
          </p>
          <ul className="mt-4 grid gap-2 text-sm opacity-90 sm:grid-cols-2">
            <li>Desembolso inicial: {soles(r.desembolsoInicial)}</li>
            <li>Cuota mensual: {soles(r.cuotaMensual)}</li>
            <li>TCOL mensual: {soles(r.tcol)}</li>
            <li>Plazo real: {r.plazoAnios} años</li>
          </ul>
        </div>

        <div className="w-full lg:w-80">
          <Button asChild variant="success" size="xl" className="w-full whitespace-normal">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" />
              Enviar simulación completa a WhatsApp
            </a>
          </Button>
          <p className="mt-3 text-center text-xs opacity-80">
            Respuesta del asesor en menos de 10 minutos en horario de oficina.
          </p>
        </div>
      </div>
    </section>
  );
}
