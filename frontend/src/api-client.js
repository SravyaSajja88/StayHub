const url = import.meta.env.VITE_API_BASE_URL||"";
const register = async (data) => {
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
const login = async(data) => {
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

const signout = async () => {
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

const validateToken = async () => {
  const response = await fetch(`${url}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};
export {register, validateToken,login,signout};