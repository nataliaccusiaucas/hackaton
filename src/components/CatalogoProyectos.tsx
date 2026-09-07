import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { PROYECTOS } from "@/lib/proyectos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CatalogoProyectos() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Encuentra tu próximo hogar
      </p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Nuestros proyectos</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Compara ubicaciones, precios y características. Conoce cada proyecto para encontrar el
        departamento que se adapta a ti.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROYECTOS.map((proyecto) => (
          <article
            key={proyecto.ruta}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 bg-secondary p-6">
              <Building2 aria-hidden="true" className="size-10 shrink-0 text-primary" />
              <Badge variant="outline">{proyecto.estado}</Badge>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl font-bold">{proyecto.nombre}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                {proyecto.distrito}
              </p>
              <p className="mt-4 text-sm">
                Desde {proyecto.areaDesde} · {proyecto.dormitorios}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">Precio desde</p>
              <p className="text-2xl font-bold text-primary">{proyecto.precioDesde}</p>
              <Button asChild variant="navy" className="mt-6 h-auto min-h-11 whitespace-normal">
                <Link to={proyecto.ruta} aria-label={`Ver proyecto ${proyecto.nombre}`}>
                  Ver proyecto <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
