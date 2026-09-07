import {
  BadgeCheck,
  Leaf,
  FileSignature,
  Wallet,
  Ruler,
  ShieldCheck,
  Baby,
  Flame,
  Car,
  Package,
  AlertTriangle,
  Building2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  soles,
  type Cochera,
  type SimResult,
  PRECIO_COCHERA,
  PRECIO_DEPOSITO,
  PRECIO_MALLAS,
} from "@/lib/simulation";

type Props = {
  r: SimResult;
  cochera: Cochera;
  setCochera: (c: Cochera) => void;
  deposito: boolean;
  setDeposito: (v: boolean) => void;
  mallas: boolean;
  setMallas: (v: boolean) => void;
};

function Fila({
  label,
  valor,
  nota,
  fuerte,
}: {
  label: string;
  valor: string;
  nota?: string;
  fuerte?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="min-w-0">
        <p className={fuerte ? "font-semibold" : ""}>{label}</p>
        {nota && <p className="text-xs text-muted-foreground">{nota}</p>}
      </div>
      <p className={`shrink-0 tabular-nums ${fuerte ? "text-lg font-bold text-primary" : ""}`}>
        {valor}
      </p>
    </div>
  );
}

export function ResultadosDashboard({
  r,
  cochera,
  setCochera,
  deposito,
  setDeposito,
  mallas,
  setMallas,
}: Props) {
  return (
    <Tabs defaultValue="a" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-1 lg:grid-cols-4">
        <TabsTrigger value="a" className="min-h-11 whitespace-normal text-xs sm:text-sm">
          A · Bono Verde
        </TabsTrigger>
        <TabsTrigger value="b" className="min-h-11 whitespace-normal text-xs sm:text-sm">
          B · Desembolso inicial
        </TabsTrigger>
        <TabsTrigger value="c" className="min-h-11 whitespace-normal text-xs sm:text-sm">
          C · TCOL mensual
        </TabsTrigger>
        <TabsTrigger value="d" className="min-h-11 whitespace-normal text-xs sm:text-sm">
          D · Espacios y seguridad
        </TabsTrigger>
      </TabsList>

      {/* Tarjeta A */}
      <TabsContent
        value="a"
        className="mt-4 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Leaf className="size-5 text-success" /> Evaluación Mivivienda Verde y subsidio
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {r.apto ? (
            <>
              <Badge className="bg-success text-success-foreground">
                🟢 Cero propiedades registradas en SUNARP
              </Badge>
              <Badge variant="secondary">Apto para Bono Mivivienda Verde</Badge>
            </>
          ) : (
            <>
              <Badge className="bg-warning text-warning-foreground">
                🟡 Propiedad registrada en SUNARP
              </Badge>
              <Badge variant="secondary">Crédito hipotecario tradicional</Badge>
            </>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Consulta simulada al servicio de SUNARP con tu DNI/CE. El resultado final se confirma con
          la constancia de búsqueda registral.
        </p>

        <Separator className="my-4" />
        <Fila
          label="Precio de lista"
          valor={soles(r.precioLista)}
          nota={`${r.distrito.proyecto} · ${r.distrito.m2} m²`}
        />
        <Fila
          label="Bono Mivivienda Verde"
          valor={`− ${soles(r.bonoVerde)}`}
          nota="Vivienda sostenible certificada"
        />
        <Fila label="Bono del Buen Pagador (BBP)" valor={`− ${soles(r.bbp)}`} />
        <Separator className="my-2" />
        <Fila
          label="Precio con subsidios aplicados"
          valor={soles(r.precioLista - r.subsidio)}
          fuerte
        />
      </TabsContent>

      {/* Tarjeta B */}
      <TabsContent
        value="b"
        className="mt-4 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <FileSignature className="size-5 text-primary" /> Desembolso inicial real · cero costos
          ocultos
        </h3>
        <Fila
          label={`Cuota inicial (${Math.round(r.pctInicial * 100)}%)`}
          valor={soles(r.cuotaInicial)}
          nota={r.apto ? "7.5% por calificar al Bono Verde" : "10% en crédito tradicional"}
        />
        <Separator className="my-2" />
        <p className="pt-1 text-sm font-semibold text-muted-foreground">
          Gastos notariales y registrales
        </p>
        <Fila label="Escritura pública (notaría)" valor={soles(r.escritura)} />
        <Fila label="Inscripción SUNARP" valor={soles(r.sunarp)} />
        <Fila label="Estudio de títulos" valor={soles(r.estudioTitulos)} />
        <Fila label="Tasación" valor={soles(r.tasacion)} />
        <Fila label="Subtotal notarial y registral" valor={soles(r.notariales)} />
        <Separator className="my-2" />
        <Fila label="Total para firmar la minuta" valor={soles(r.desembolsoInicial)} fuerte />
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-secondary p-3 text-sm">
          <BadgeCheck className="mt-0.5 size-4 shrink-0 text-success" />
          <p>
            <strong>Alcabala: inafecto.</strong> Por tratarse de primera venta hecha por el
            constructor, no pagas impuesto de alcabala.
          </p>
        </div>
      </TabsContent>

      {/* Tarjeta C */}
      <TabsContent
        value="c"
        className="mt-4 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Wallet className="size-5 text-primary" /> TCOL · costo real de vivir aquí
        </h3>
        <Fila
          label="Cuota hipotecaria ajustada por edad"
          valor={soles(r.cuotaMensual)}
          nota={`Plazo máximo ${r.plazoAnios} años · TEA ${(r.tea * 100).toFixed(2)}% · incluye desgravamen ${soles(r.desgravamen)}`}
        />
        <Fila
          label="Mantenimiento del edificio"
          valor={soles(r.mantenimiento)}
          nota="Áreas comunes, vigilancia y ascensores"
        />
        <Fila
          label="Luz, agua y gas natural"
          valor={soles(r.servicios + r.gasNatural)}
          nota={
            r.apto ? "Con ahorro ecológico de vivienda verde (−20% aprox.)" : "Consumo estándar"
          }
        />
        <Fila label="Arbitrios municipales" valor={soles(r.arbitrios)} />
        <Separator className="my-2" />
        <Fila label="Gasto fijo mensual total" valor={soles(r.tcol)} fuerte />
        <div className="mt-4">
          <p className="mb-2 text-xs text-muted-foreground">
            Peso de la cuota dentro de tu gasto mensual
          </p>
          <Progress value={(r.cuotaMensual / r.tcol) * 100} />
        </div>
      </TabsContent>

      {/* Tarjeta D */}
      <TabsContent
        value="d"
        className="mt-4 space-y-5 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Ruler className="size-5 text-primary" /> Personalizador de espacios y seguridad
        </h3>

        <div>
          <p className="mb-2 text-sm font-semibold">Unidades complementarias</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PRECIO_COCHERA) as Cochera[]).map((c) => (
              <Button
                key={c}
                type="button"
                variant={cochera === c ? "navy" : "outline"}
                className="min-h-11"
                onClick={() => setCochera(c)}
              >
                <Car className="size-4" />
                {c === "ninguna"
                  ? "Sin cochera"
                  : c === "simple"
                    ? "Cochera simple"
                    : "Cochera doble"}
                {c !== "ninguna" && <span className="opacity-80">+{soles(PRECIO_COCHERA[c])}</span>}
              </Button>
            ))}
          </div>
          <label className="mt-3 flex items-center gap-3 rounded-xl border p-3">
            <Checkbox
              id="deposito"
              checked={deposito}
              onCheckedChange={(v) => setDeposito(v === true)}
            />
            <span className="flex min-w-0 items-center gap-2 text-sm">
              <Package className="size-4 shrink-0 text-muted-foreground" />
              Depósito / almacén (+{soles(PRECIO_DEPOSITO)} y +{soles(20)} de mantenimiento)
            </span>
          </label>
        </div>

        <div className="rounded-xl bg-secondary p-4">
          <p className="text-sm font-semibold">Space Reality Check · metraje útil sin muros</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <p className="text-sm">
              Área total: <strong>{r.distrito.m2} m²</strong>
            </p>
            <p className="text-sm">
              Área útil sin muros: <strong>{r.areaUtilSinMuros} m²</strong>
            </p>
            <p className="text-sm">
              Diferencia: <strong>{r.distrito.m2 - r.areaUtilSinMuros} m²</strong>
            </p>
          </div>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>Sofá compacto de 1.80 m — deja 82 cm de paso libre ✅</li>
            <li>Comedor de 4 sillas (1.20 m) — deja 78 cm de paso libre ✅</li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
              Cama king (2.00 m) en dormitorio secundario — solo 62 cm de paso, bajo el mínimo de 75
              cm.
            </li>
          </ul>
        </div>

        <label className="flex items-start gap-3 rounded-xl border p-3">
          <Checkbox
            id="mallas"
            checked={mallas}
            onCheckedChange={(v) => setMallas(v === true)}
            className="mt-1"
          />
          <span className="min-w-0 text-sm">
            <span className="flex items-center gap-2 font-medium">
              <Baby className="size-4 shrink-0" /> Mallas de seguridad infantil (pisos altos)
            </span>
            <span className="text-muted-foreground">
              +{soles(PRECIO_MALLAS)} · instalación con autorización previa según el Reglamento
              Interno del condominio.
            </span>
          </span>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="size-4 text-success" /> Certificación antisísmica
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Licencia municipal de edificación vigente</li>
              <li>Estudio de mecánica de suelos aprobado</li>
              <li>Garantía estructural por 10 años</li>
              <li>Seguro de reconstrucción y sismo</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Flame className="size-4 text-accent" /> Equipamiento Life Safety
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Detectores fotoeléctricos de humo</li>
              <li>Detector de gas con electroválvula de corte automático</li>
              <li>Rociadores y señalización de evacuación</li>
            </ul>
          </div>
        </div>

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="size-4 shrink-0" /> Precio con adicionales:{" "}
          <strong className="text-foreground">{soles(r.precioLista + r.mallas)}</strong>
        </p>
      </TabsContent>
    </Tabs>
  );
}
