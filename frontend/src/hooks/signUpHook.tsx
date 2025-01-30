import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../redux/api/authApi";
import { setAuthUser, setSigningUp } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { RootState } from "../redux/store";


interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}
export const UseSignUpActions = () => {
    const dispatch = useDispatch();
    const [signup ] = useSignupMutation();
    const isSigningUp = useSelector((state:RootState)=> state.auth.isSigningUp)
    console.log("isSigned In hook",isSigningUp)
    const handleSignUp = async (formData: SignUpFormData) => {
        console.log("Dispatching setSigningUp(true)");
        dispatch(setSigningUp(true));
        try {
           const res =   await signup(formData).unwrap();
            dispatch(setAuthUser(res));
            toast.success("Signed Up Successfully");
        } catch (error: any) {
            console.log("Signup error:", error);
            const errorMessage = error?.data?.message || "An error occurred during signup";
            toast.error(errorMessage);
            if (error?.data?.errors) {
                console.error("Validation errors:", error.data.errors);
            }
        } finally {
            console.log("Dispatching setSigningUp(false)");
            dispatch(setSigningUp(false));
        }
    }

    return { handleSignUp }
}