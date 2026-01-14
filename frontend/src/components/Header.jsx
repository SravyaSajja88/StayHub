import { Link } from "react-router-dom"
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.jsx";
import { SignOutButton } from "../components/SignOutButton.jsx"
const Header = () => {
    const { isLoggedIn } = useContext(AppContext);
    return (
        <div className="bg-blue-800 py-6">
            <div className="container-custom mx-auto flex justify-between">
                <span className="text-white text-2xl font-bold tracking-tight">
                    <Link to="/">MernHolidays.com</Link>
                </span>
                
                <span className="flex space-x-2">
                    {isLoggedIn ? 
                        (<>
                        <Link to="/my-bookings" className="flex items-center text-blue-200 px-3 font-bold hover:bg-blue-700 cursor-pointer">My Bookings</Link>
                        <Link to="/my-hotels" className="flex items-center text-blue-200 px-3 font-bold hover:bg-blue-700 cursor-pointer">My Hotels</Link>
                        <SignOutButton/> </>):
                        (<Link to="/sign-in" className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white cursor-pointer">Sign In</Link>)
                    }
                    
                </span>

            </div>
        </div>
    )
}
export default Header;