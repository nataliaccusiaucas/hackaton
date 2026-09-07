import { createContext, useContext } from "react";

export type Estado = {
  grande: boolean;
  legible: boolean;
  contraste: boolean;
  silla: boolean;
  kiosco: boolean;
};

export const inicial: Estado = {
  grande: false,
  legible: false,
  contraste: false,
  silla: false,
  kiosco: false,
};

type Ctx = Estado & { toggle: (k: keyof Estado) => void };

export const AccesibilidadCtx = createContext<Ctx>({ ...inicial, toggle: () => {} });

export const useAccesibilidad = () => useContext(AccesibilidadCtx);
