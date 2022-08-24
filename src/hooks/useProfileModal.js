import  {useEffect,useState} from "react";

export function useProfileModal (){
    const [showProfileModal, setShowProfileModal] = useState(true);
    return {
        setShowProfileModal,
        showProfileModal
    }
}