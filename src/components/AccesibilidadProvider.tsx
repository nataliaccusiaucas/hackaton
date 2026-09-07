import { AccesibilidadCtx, inicial, type Estado } from "@/hooks/use-accesibilidad";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Accessibility, Contrast, Type, ArrowDownToLine, X, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AccesibilidadProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>(inicial);
  const [abierto, setAbierto] = useState(false);

  const toggle = useCallback((k: keyof Estado) => {
    setEstado((prev) => ({ ...prev, [k]: !prev[k] }));
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("a11y-grande", estado.grande);
    el.classList.toggle("a11y-legible", estado.legible);
    el.classList.toggle("a11y-contraste", estado.contraste);
    el.classList.toggle("a11y-silla", estado.silla);
  }, [estado]);

  const value = useMemo(() => ({ ...estado, toggle }), [estado, toggle]);

  const opciones: { k: keyof Estado; label: string; icon: React.ReactNode }[] = [
    { k: "grande", label: "Texto más grande", icon: <Type className="size-4" /> },
    { k: "legible", label: "Fuente de alta visibilidad", icon: <Type className="size-4" /> },
    { k: "contraste", label: "Alto contraste", icon: <Contrast className="size-4" /> },
    {
      k: "silla",
      label: "Altura reducida (silla de ruedas)",
      icon: <ArrowDownToLine className="size-4" />,
    },
    {
      k: "kiosco",
      label: "Modo kiosco inclusivo",
      icon: <MonitorSmartphone className="size-4" />,
    },
  ];

  return (
    <AccesibilidadCtx.Provider value={value}>
      {children}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {abierto && (
          <div className="w-72 rounded-2xl border bg-card p-4 shadow-[var(--shadow-float)]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Accesibilidad universal</h3>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cerrar panel de accesibilidad"
                className="min-h-11 min-w-11"
                onClick={() => setAbierto(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
            <ul className="space-y-3">
              {opciones.map((o) => (
                <li key={o.k} className="flex items-center justify-between gap-3">
                  <Label
                    htmlFor={`a11y-${o.k}`}
                    className="flex min-w-0 items-center gap-2 text-sm"
                  >
                    <span className="shrink-0 text-muted-foreground">{o.icon}</span>
                    <span className="min-w-0">{o.label}</span>
                  </Label>
                  <Switch
                    id={`a11y-${o.k}`}
                    checked={estado[o.k]}
                    onCheckedChange={() => toggle(o.k)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          size="icon"
          aria-label="Abrir opciones de accesibilidad"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className="size-14 rounded-full shadow-[var(--shadow-float)]"
        >
          <Accessibility className="size-7" />
        </Button>
      </div>
    </AccesibilidadCtx.Provider>
  );
}
