import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
const Layout = () =>{
    return(
        <div className="flex flex-col min-h-screen">
            <Header/>
            <Hero />
            <SearchBar/>
            <div className="container-custom py-10 mx-auto flex-1">
                <Outlet />
            </div>
            
            <Footer/>
        </div>
    )
}

export default Layout;