import { createContext, useState, useEffect } from "react";
import { validateToken } from "../api-client";

const AppContext = createContext();
const AppContextProvider = ({ children }) =>{
    const [toast,setToast] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const showToast = (type,message) => {
        setToast({type,message});
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        const id = setTimeout(() => {
            setToast(null);
            setTimeoutId(null);
        },5000);
        setTimeoutId(id);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = unknown, true/false known

    const refreshAuth = async () => {
        try {
            await validateToken();
            setIsLoggedIn(true);
        } catch (err) {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        let mounted = true;
        const checkToken = async () => {
            try {
                await validateToken();
                if (mounted) setIsLoggedIn(true);
            } catch (err) {
                if (mounted) setIsLoggedIn(false);
            }
        };
        checkToken();
        return () => { mounted = false; };
    }, []);

    return(
        <AppContext.Provider value={{ toast, showToast, isLoggedIn, refreshAuth }}>
            {children}
            {toast && (
                <div className="fixed top-4 right-4 z-50">
                    <div className={`max-w-xs px-4 py-2 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`}>
                        {toast.message}
                    </div>
                </div>
            )}
        </AppContext.Provider>    
    )
}
export { AppContext, AppContextProvider };