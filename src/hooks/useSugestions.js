import { getSugestions } from "../api/MarketListApi";
import { sugestionsAtom } from "./states";
import { useAtom } from "jotai";

export function useSugestions() {
  const [sugestions, setSugestions] = useAtom(sugestionsAtom);

  async function fetchSugestions(search) {
    const { data } = await getSugestions(search);
    setSugestions(data);
  }

  return {
    sugestions,
    fetchSugestions,
  };
}
