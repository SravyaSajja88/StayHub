import { useEffect, useState, useMemo } from "react";
import { fetchCurrentUser,fetchHotelById } from "../api-client.js";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { AppContext } from "../contexts/AppContext.jsx";
import BookingForm from "../forms/BookingForm.jsx/BookingForm.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const Booking = () => {
    const [user,setUser] = useState(null);
    const [hotel,setHotel] = useState(null);
    const search = useSearchContext();
    const { hotelId } = useParams();

    const numberOfNights = useMemo(() => {
        if (search.checkIn && search.checkOut) {
            const nights =
                Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24);
            return Math.ceil(nights);
        }
        return 0;
    }, [search.checkIn, search.checkOut]);

    useEffect(() => {
        const fetchUser = async() => {
            try{
                const userData = await fetchCurrentUser();
                console.log(userData);
                setUser(userData);
            }
            catch(err){
                console.error("Error fetching user data:", err);
            }
        }
        fetchUser();
    },[])

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const hotelData = await fetchHotelById(hotelId);
                console.log(hotelData);
                setHotel(hotelData);
            } catch (err) {
                console.error("Error fetching hotel data:", err);
            }
        };
        fetchHotel();
    }, [hotelId]);

    if(!hotel || !user){
        return <div>Loading...</div>;
    }

    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
        <BookingDetailsSummary
            checkIn={search.checkIn}
            checkOut={search.checkOut}
            adultCount={search.adultCount}
            childCount={search.childCount}
            numberOfNights={numberOfNights}
            hotel={hotel}
        />
        <Elements stripe={stripePromise}>
            <BookingForm
                currentUser={user}
                numberOfNights={numberOfNights}
              />
        </Elements>
        </div>
    );
}
export default Booking;