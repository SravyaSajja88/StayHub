import { signout as signOutFunc} from "../api-client.js"
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext.jsx";
const SignOutButton = () => {
    const { logout, showToast } = useContext(AppContext);
    const navigate = useNavigate();
    const signout = async() => {
        try{
            await signOutFunc();
            logout();
            showToast('success','Logout successful!');
            navigate('/');
        }
        
        catch(error) {
            showToast('error',error.message || 'Login failed');
            return;
        }
        

    }
    return (
    <button className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white cursor-pointer" onClick={signout}>Sign Out</button>
    )
}

export { SignOutButton }