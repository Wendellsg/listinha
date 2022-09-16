import {  useMemo,  } from "react"

export function useUserData(){
   const userData = useMemo(() =>JSON.parse(localStorage.getItem("@ListinhaUserData")), []);
    return {
        userData
    }
}
