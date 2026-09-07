import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;
function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
