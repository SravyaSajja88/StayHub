import {ManageHotelForm} from "../forms/ManageHotelForm/ManageHotelForm.jsx";
import {addMyHotel} from "../api-client.js";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../contexts/AppContext.jsx";

const AddHotel = () => {
    const { showToast } = useContext(AppContext);
    const navigate = useNavigate();
    const onSave = async(formData)=>{
        try{
            const res = await addMyHotel(formData);
            showToast('success','Hotel added successfully!');
            navigate('/');
        }
        catch(error){
            showToast('error',error.response?.data?.message || 'Error adding hotel');
            console.error("Error adding hotel",error);
        }
        
    }
    return (<ManageHotelForm onSave={onSave}/>);
}
export default AddHotel;