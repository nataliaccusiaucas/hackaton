import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DISTRITOS, soles } from "@/lib/simulation";

type Props = {
  dni: string;
  setDni: (v: string) => void;
  distritoId: string;
  setDistritoId: (v: string) => void;
  edad: number;
  setEdad: (v: number) => void;
  onSimular: () => void;
};

export function PreEvaluacion({
  dni,
  setDni,
  distritoId,
  setDistritoId,
  edad,
  setEdad,
  onSimular,
}: Props) {
  const plazo = Math.max(5, Math.min(25, 75 - edad));

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-float)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Pre-evaluación express · 15 segundos
      </p>
      <h2 className="mt-1 text-xl font-bold">Simula tu depa con números reales</h2>

      <form
        className="mt-5 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSimular();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="dni">DNI / CE</Label>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Input
              id="dni"
              inputMode="numeric"
              maxLength={12}
              placeholder="Ej. 45872310"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/[^0-9]/g, ""))}
              className="min-h-11"
            />
            <Button type="submit" variant="cta" className="min-h-11 shrink-0">
              <Search className="size-4" />
              <span className="hidden sm:inline">Simular mi Depa</span>
              <span className="sm:hidden">Simular</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Consultamos tu estado en SUNARP para validar el Bono Mivivienda Verde.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="proyecto">Proyecto o distrito de preferencia</Label>
          <Select value={distritoId} onValueChange={setDistritoId}>
            <SelectTrigger id="proyecto" className="min-h-11 w-full">
              <SelectValue placeholder="Elige un distrito" />
            </SelectTrigger>
            <SelectContent>
              {DISTRITOS.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.nombre} — {d.proyecto} ({soles(d.precio)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Label htmlFor="edad">Tu edad</Label>
            <span className="text-sm font-semibold text-primary">
              {edad} años · plazo real {plazo} años
            </span>
          </div>
          <Slider
            id="edad"
            min={18}
            max={75}
            step={1}
            value={[edad]}
            onValueChange={(v) => setEdad(v[0] ?? edad)}
            aria-label="Rango de edad"
          />
          <p className="text-xs text-muted-foreground">
            El plazo se ajusta al seguro de desgravamen: el crédito debe terminar antes de los 75
            años.
          </p>
        </div>
      </form>
    </div>
  );
}
