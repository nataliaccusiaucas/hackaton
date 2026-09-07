import { useMemo, useState } from "react";
import { CalendarCheck, Video, MapPin, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HORAS = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];
const ASESORES = [
  "Sala de ventas · Depa piloto (asesor disponible)",
  "Karina Ríos · Especialista Mivivienda Verde",
  "Diego Paredes · Especialista en crédito hipotecario",
  "Lucía Ortega · Atención accesible e inclusiva",
];

export function Agendador({ onAgendar }: { onAgendar: (resumen: string) => void }) {
  const dias = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i + 1);
      return d;
    });
  }, []);

  const [dia, setDia] = useState<Date>(dias[0] as Date);
  const [hora, setHora] = useState(HORAS[1] as string);
  const [asesor, setAsesor] = useState(ASESORES[0] as string);
  const [modalidad, setModalidad] = useState<"presencial" | "virtual">("presencial");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const fmt = (d: Date) =>
    d.toLocaleDateString("es-PE", { weekday: "short", day: "numeric", month: "short" });

  const confirmar = () => {
    const resumen = `${fmt(dia)} a las ${hora} · ${modalidad} · ${asesor}`;
    onAgendar(resumen);
    toast.success("Visita confirmada", {
      description: `${resumen}. Te enviaremos el recordatorio a ${telefono || "tu teléfono"} y ${correo || "tu correo"}.`,
    });
  };

  return (
    <section
      aria-labelledby="agenda"
      className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <h2 id="agenda" className="flex items-center gap-2 text-2xl font-bold">
        <CalendarCheck className="size-6 text-primary" /> Agenda tu visita a la sala de ventas
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Elige día, hora y asesor. Confirmamos al instante con recordatorio a tu celular y correo.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold">Día disponible</p>
          <div className="flex flex-wrap gap-2">
            {dias.map((d) => (
              <Button
                key={d.toISOString()}
                variant={d.toDateString() === dia.toDateString() ? "navy" : "outline"}
                className="min-h-11 capitalize"
                onClick={() => setDia(d)}
              >
                {fmt(d)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Horario</p>
          <div className="flex flex-wrap gap-2">
            {HORAS.map((h) => (
              <Button
                key={h}
                variant={h === hora ? "navy" : "outline"}
                className="min-h-11"
                onClick={() => setHora(h)}
              >
                {h}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="asesor">Asesor o sala de ventas</Label>
            <Select value={asesor} onValueChange={setAsesor}>
              <SelectTrigger id="asesor" className="min-h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASESORES.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Modalidad</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={modalidad === "presencial" ? "navy" : "outline"}
                className="min-h-11 flex-1"
                onClick={() => setModalidad("presencial")}
              >
                <MapPin className="size-4" /> Presencial
              </Button>
              <Button
                variant={modalidad === "virtual" ? "navy" : "outline"}
                className="min-h-11 flex-1"
                onClick={() => setModalidad("virtual")}
              >
                <Video className="size-4" /> Virtual
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tel">Celular para el recordatorio</Label>
            <Input
              id="tel"
              inputMode="tel"
              placeholder="999 888 777"
              className="min-h-11"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mail">Correo</Label>
            <Input
              id="mail"
              type="email"
              placeholder="tucorreo@mail.com"
              className="min-h-11"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="cta"
          size="lg"
          className="h-auto min-h-11 w-full whitespace-normal py-3 sm:w-auto"
          onClick={confirmar}
        >
          <Check className="size-5" /> Confirmar visita y recibir recordatorio
        </Button>
      </div>
    </section>
  );
}
