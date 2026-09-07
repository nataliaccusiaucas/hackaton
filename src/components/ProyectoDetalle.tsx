import { Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Check, MapPin } from "lucide-react";
import type { Proyecto } from "@/lib/proyectos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProyectoDetalle({ proyecto }: { proyecto: Proyecto }) {
  const caracteristicas = [
    ["Área desde", proyecto.areaDesde],
    ["Dormitorios", proyecto.dormitorios],
    ["Estado", proyecto.estado],
    ["Entrega", proyecto.entrega ?? "Por confirmar"],
  ];
  return (
    <main className="min-h-dvh bg-background">
      <nav aria-label="Volver al listado" className="mx-auto max-w-6xl px-4 py-6">
        <Button asChild variant="ghost" className="h-auto min-h-11 whitespace-normal">
          <Link to="/" hash="proyectos">
            <ArrowLeft aria-hidden="true" className="size-4" /> Volver a proyectos
          </Link>
        </Button>
      </nav>
      <section className="bg-[image:var(--gradient-navy)] text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center sm:py-16">
          <div className="min-w-0">
            <Badge className="bg-success text-success-foreground">{proyecto.estado}</Badge>
            <h1 className="mt-4 break-words text-4xl font-bold sm:text-5xl">{proyecto.nombre}</h1>
            <p className="mt-4 flex items-start gap-2">
              <MapPin aria-hidden="true" className="size-5 shrink-0" />
              {proyecto.direccion}, {proyecto.distrito}
            </p>
            <p className="mt-8 text-sm opacity-80">Departamentos desde</p>
            <p className="text-3xl font-bold">{proyecto.precioDesde}</p>
          </div>
          <Building2 aria-hidden="true" className="hidden size-32 opacity-30 md:block" />
        </div>
      </section>
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:py-14">
        <section aria-labelledby="caracteristicas">
          <h2 id="caracteristicas" className="text-2xl font-bold">
            Características del proyecto
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {proyecto.descripcion}
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {caracteristicas.map(([titulo, valor]) => (
              <div key={titulo} className="min-w-0 rounded-2xl border bg-card p-5">
                <dt className="text-sm text-muted-foreground">{titulo}</dt>
                <dd className="mt-2 font-semibold">{valor}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="areas-comunes" className="rounded-2xl border bg-card p-6 sm:p-8">
          <h2 id="areas-comunes" className="text-2xl font-bold">
            Áreas comunes
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proyecto.areasComunes.map((area) => (
              <li key={area} className="flex items-start gap-3">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                {area}
              </li>
            ))}
          </ul>
        </section>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="navy" className="h-auto min-h-11 whitespace-normal">
            <Link to="/" hash="proyectos">
              Explorar otros proyectos
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
