import { createContext, useState, useEffect } from "react";
import { validateToken } from "../api-client";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const AppContext = createContext();
const AppContextProvider = ({ children }) =>{
    const [toast,setToast] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = unknown, true/false known

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

    

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    const refreshAuth = async () => {
        try {
            await validateToken();
            setIsLoggedIn(true);
        } catch {
            setIsLoggedIn(false);
        }
    };
    
    useEffect(() => {
        const checkAuth = async () => {
        try {
            await validateToken();
            setIsLoggedIn(true);
        } catch {
            setIsLoggedIn(false);
        }
        };
        checkAuth();
    }, []);

    const stripePromise = loadStripe(STRIPE_PUB_KEY);

    return(
        <AppContext.Provider value={{ showToast, isLoggedIn, login, logout, refreshAuth, stripePromise }}>
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