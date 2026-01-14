import { useEffect, useState } from "react";
import {ManageHotelForm} from "../forms/ManageHotelForm/ManageHotelForm.jsx";
import { useParams } from "react-router-dom";
import { fetchMyHotelById,updateMyHotelById } from "../api-client.js";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../contexts/AppContext.jsx";
import { useContext } from "react";
const EditHotel = () => {
    const { id } = useParams();  
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    const { showToast } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(() => {
        const loadHotel = async () => {
        try {
            const data = await fetchMyHotelById(id);
            setHotel(data);
        } catch (err) {
            console.error(err);
            setHotel(null);
        } finally {
            setLoading(false);
        }
        };

        loadHotel();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!hotel) return <div>No hotel found</div>;

    const onSave = async (hotelFormData) => {
      try {
        await updateMyHotelById(hotelFormData);
        showToast('success','Hotel updated successfully!');
        navigate('/');
      } catch (error) {
        showToast('error',error || 'Error editing hotel');
        console.error("Error editing hotel",error);
      }
    }
    return <ManageHotelForm hotel={hotel} onSave={onSave}/>;

}
export default EditHotel;