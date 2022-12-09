import { getSugestions } from "../api/MarketListApi";
import { sugestionsAtom } from "./states";
import { useAtom } from "jotai";

export function useSugestions() {
  const [sugestions, setSugestions] = useAtom(sugestionsAtom);

  async function fetchSugestions(search) {
    const response = await getSugestions(search);
    setSugestions(response);
  }

  return {
    sugestions,
    fetchSugestions,
  };
}
