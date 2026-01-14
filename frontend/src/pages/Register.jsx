import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {register as apiRegister} from "../api-client.js";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.jsx";

const Register = () =>{
    const {register,handleSubmit,watch,formState:{errors}} = useForm();
    const { showToast, login } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data)=>{
        try{
            await apiRegister(data);
            login();
            showToast('success','Registration successful!');
            navigate('/');
        }
        catch(err){
            showToast('error',err.response?.data?.message || 'Registration failed');
            return;
        }
        
    })
    return(
        <div className="flex flex-col gap-4 px-20">
            <h2 className="font-bold text-2xl">Create Account</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row flex-1">
                    <label htmlFor="firstName">
                        <p className="font-medium">First Name:</p>
                        <input id="firstName" type="text" {...register("firstName",{required:"First Name is required"})} className="border border-gray-300 rounded-md p-2 w-full md:mr-2" autoComplete="given-name"/>
                        {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
                    </label>
                    <label htmlFor="lastName">
                        <p className="font-medium">Last Name:</p>
                        <input id="lastName" type="text" {...register("lastName",{required:"Last Name is required"})} className="border border-gray-300 rounded-md p-2 w-full md:ml-2" autoComplete="family-name"/>
                        {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
                    </label>

                </div>
                <label htmlFor="email">
                    <p className="font-medium">Email:</p>
                    <input id="email" type="email" {...register("email",{required:"Email is required"})} className="border border-gray-300 rounded-md p-2 w-full" autoComplete="email"/>
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                </label>
                <label htmlFor="password">
                    <p className="font-medium">Password:</p>
                    <input id="password" type="password" {...register("password",{required:"Password is required",minLength:{value:6,message:"Password must be at least 6 characters"}})} className="border border-gray-300 rounded-md p-2 w-full" autoComplete="new-password"/>
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                </label>
                <label htmlFor="confirmPassword">
                    <p className="font-medium">Confirm Password:</p>
                    <input id="confirmPassword" type="password" {...register("confirmPassword",{required:"Confirm Password is required",validate:value=>value===watch("password") || "Passwords do not match"})} className="border border-gray-300 rounded-md p-2 w-full" autoComplete="new-password"/>
                    {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                </label>
                <div className="flex flex-row justify-between items-center">
                    <span>
                        Already have an account? <Link to="/sign-in" className="text-blue-600 hover:underline">Login</Link>
                    </span>
                    <button type="submit" className="bg-blue-700 text-white p-2 rounded-md mt-4 hover:bg-blue-800">Register</button>
                </div>
                
            </form> 

        </div>
    )
}
export default Register;