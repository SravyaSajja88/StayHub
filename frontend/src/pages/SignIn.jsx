import {useForm} from 'react-hook-form';
import {Link,useNavigate} from 'react-router-dom';
import { login } from '../api-client.js';
import {useContext} from 'react';
import { AppContext } from '../contexts/AppContext.jsx';

const SignIn = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const { showToast, refreshAuth } = useContext(AppContext);
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data) => {
        try{
            await login(data);

            await refreshAuth();
            showToast('success','Login successful!');
            navigate('/');
        }
        catch(err){
            showToast('error',err.message || 'Login failed');
            return;
        }
        
    });
    return (
        <div className="flex flex-col gap-4 px-20">
            <h2 className="font-bold text-2xl">Sign In</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                
                <label htmlFor="email">
                    <p className="font-medium">Email:</p>
                    <input id="email" type="email" {...register("email",{required:"Email is required"})} className="border border-gray-300 rounded-md p-2 w-full" autoComplete="email"/>
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                </label>
                <label htmlFor="password">
                    <p className="font-medium">Password:</p>
                    <input id="password" type="password" {...register("password",{required:"Password is required",minLength:{value:6,message:"Password must be at least 6 characters"}})} className="border border-gray-300 rounded-md p-2 w-full" autoComplete="current-password"/>
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                </label>
                
                <div className="flex flex-row justify-between items-center">
                    <span>
                        Not registered? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                    </span>
                    <button type="submit" className="bg-blue-700 text-white p-2 rounded-md mt-4 hover:bg-blue-800">Sign In</button>
                </div>
                
            </form> 

        </div>
    );
}
export default SignIn;
