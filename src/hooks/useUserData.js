import { useEffect, useState } from "react"

const savedUserData = JSON.parse(localStorage.getItem("@ListinhaUserData"));
export function useUserData(){
    const [userData, setUserData] = useState(savedUserData)

    useEffect(()=>{
        const savedUserData = JSON.parse(localStorage.getItem("@ListinhaUserData"));

        if(!savedUserData)return
        setUserData(savedUserData)
    },[])
    return {
        userData
    }
}
