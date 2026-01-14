const url = import.meta.env.VITE_API_BASE_URL||"";
export const register = async (data) => {
    try{
        const res = await fetch(`${url}/api/users/register`,{
            method:'POST',
            credentials:'include', //needed for cookie handling
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const resbody = await res.json();
        if(!res.ok){
            throw new Error(resbody.message || 'Registration failed');
        }
        console.log("SUCCESS:", resbody);
    }
    catch(error){
        throw new Error(error.message);
    }
}
export const login = async(data) => {
    try{
      const res = await fetch(`${url}/api/auth/login`,{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      });
      if(!res.ok){
        const resbody = await res.json();
        throw new Error(resbody.message || 'Login failed');
      }
      // No need to parse body for 200
    }catch(error){
      throw new Error(error.message);
    }
};

export const signout = async () => {
  try{
    const res = await fetch(`${url}/api/auth/logout`,{
      method:"POST",
      credentials:"include",

    });
    if(!res.ok) {
      throw new Error("Logout failed");
    }

  }catch(error){
      throw new Error(error.message);
    }
}

export const validateToken = async () => {
  const response = await fetch(`${url}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const addMyHotel = async (formData) => {
    try{
        const res = await fetch(`${url}/api/my-hotels`,{ 
            method:'POST',
            credentials:'include',
            body:formData 
        });

        const resbody = await  res.json();  
        if(!res.ok){
            throw new Error(resbody.message || 'Adding hotel failed');
        }
        return resbody;
    }
    catch(error){
        throw new Error(error.message);
    }
};

export const fetchMyHotels = async() => {
  try{
    const res = await fetch(`${url}/api/my-hotels`,{
      method:'GET',
      credentials:'include',
    });
    
    if(!res.ok){
      const resbody = await res.json();
      throw new Error(resbody.message || 'Fetching hotels failed');
    }
    return res.json();
  }
  catch(error){
    throw new Error(error.message);
  }
}
export const fetchMyHotelById = async (hotelId) => {
  const response = await fetch(`${url}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData) => {
  const response = await fetch(
    `${url}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  const resBody = await response.json();

  if (!response.ok) {
    throw new Error(resBody.message || "Failed to update Hotel");
  }

  return resBody;
};

export const searchHotels = async(searchParams) => {

  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn ? new Date(searchParams.checkIn).toISOString() : "");
  queryParams.append("checkOut", searchParams.checkOut ? new Date(searchParams.checkOut).toISOString() : "");
  queryParams.append("adultCount", searchParams.adultCount || 1);
  queryParams.append("childCount", searchParams.childCount || 0);
  queryParams.append("page", searchParams.page || 1);

  if (searchParams.stars && searchParams.stars.length > 0) {
    searchParams.stars.forEach(star => queryParams.append("stars", star));
  }

  if (searchParams.types && searchParams.types.length > 0) {
    searchParams.types.forEach(type => queryParams.append("types", type));
  }

  if (searchParams.facilities && searchParams.facilities.length > 0) {
    searchParams.facilities.forEach(facility => queryParams.append("facilities", facility));
  }

  if (searchParams.maxPrice) {
    queryParams.append("maxPrice", searchParams.maxPrice);
  }

  if (searchParams.sortOption) {
    queryParams.append("sortOption", searchParams.sortOption);
  }
  
  const response = await fetch(`${url}/api/hotels/search?${queryParams}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
}

export const fetchHotelById = async (hotelId) => {
  const response = await fetch(`${url}/api/hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotel details");
  }
  return response.json();
};
export const fetchCurrentUser = async ()=> {
  const response = await fetch(`${url}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const createPaymentIntent = async (
  hotelId,
  numberOfNights) => {
  const response = await fetch(
    `${url}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const bookRoom = async ({ hotelId, ...bookingData }) => {
  const response = await fetch(`${url}/api/hotels/${hotelId}/bookings`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Error booking room");
  }

  return response.json();
};

export const fetchMyBookings = async () => {
  const response = await fetch(`${url}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};

export const fetchHotels = async () => {
  return searchHotels({});
};