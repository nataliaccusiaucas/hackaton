import { MapPin, Bus, Ruler, Wallet, QrCode } from "lucide-react";
import { soles, type SimResult } from "@/lib/simulation";

export function KioscoAccesible({ r, mensaje }: { r: SimResult; mensaje: string }) {
  const url = `https://wa.me/51987654321?text=${encodeURIComponent(mensaje)}`;
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(url)}`;
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(r.distrito.nombre + ", Lima, Perú")}&output=embed`;

  return (
    <section
      aria-labelledby="kiosco"
      className="rounded-3xl border-4 border-primary bg-card p-6 shadow-[var(--shadow-float)] sm:p-10"
    >
      <p className="text-sm font-bold uppercase tracking-widest text-success">
        Modo kiosco inclusivo activo
      </p>
      <h2 id="kiosco" className="mt-2 text-3xl font-bold sm:text-5xl">
        {r.distrito.proyecto}
      </h2>
      <p className="mt-2 text-xl text-muted-foreground sm:text-2xl">{r.distrito.nombre}, Lima</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-secondary p-6">
            <p className="flex items-center gap-2 text-lg text-muted-foreground">
              <Wallet className="size-6" /> Precio total
            </p>
            <p className="mt-1 text-4xl font-bold text-primary">{soles(r.precioLista)}</p>
          </div>
          <div className="rounded-2xl bg-secondary p-6">
            <p className="flex items-center gap-2 text-lg text-muted-foreground">
              <Wallet className="size-6" /> Cuota mensual
            </p>
            <p className="mt-1 text-4xl font-bold text-primary">{soles(r.cuotaMensual)}</p>
          </div>
          <div className="rounded-2xl bg-secondary p-6">
            <p className="flex items-center gap-2 text-lg text-muted-foreground">
              <Ruler className="size-6" /> Metraje
            </p>
            <p className="mt-1 text-4xl font-bold text-primary">{r.distrito.m2} m²</p>
            <p className="text-base text-muted-foreground">{r.areaUtilSinMuros} m² útiles</p>
          </div>
          <div className="rounded-2xl bg-secondary p-6">
            <p className="flex items-center gap-2 text-lg text-muted-foreground">
              <Bus className="size-6" /> Transporte
            </p>
            <p className="mt-1 text-xl font-semibold">
              Metropolitano a 6 min · Corredor Azul a 3 min · rampa de acceso en el ingreso
              principal
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border sm:col-span-2">
            <p className="flex items-center gap-2 bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
              <MapPin className="size-6" /> Ubicación
            </p>
            <iframe
              title={`Mapa de ${r.distrito.proyecto}`}
              src={mapa}
              className="h-72 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-secondary p-6 text-center">
          <p className="flex items-center gap-2 text-lg font-semibold">
            <QrCode className="size-6" /> Envíalo a tu celular
          </p>
          <img
            src={qr}
            alt="Código QR para enviar la simulación completa al celular"
            width={240}
            height={240}
            className="mt-4 rounded-xl bg-card p-2"
            loading="lazy"
          />
          <p className="mt-4 text-base text-muted-foreground">
            Escanea y recibe precio, cuota, metraje y ubicación en 1 clic.
          </p>
        </div>
      </div>
    </section>
  );
}
