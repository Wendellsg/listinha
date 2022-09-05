import { getSugestions } from "../api/MarketListApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useSugestions(search){
    const {data, refetch } = useQuery(["SugestionData"], () =>
    getSugestions(search)
  );

  const [sugestions, setSugestions] = useState(null); 

  useEffect(()=>{
    refetch()
  },[search, refetch])

  useEffect(()=>{
    setSugestions(data)
  },[data])

  
  return{
    sugestions,
    refetch,
  }
}