import { useDispatch } from "react-redux";
import { useSignupMutation } from "../redux/api/authApi";
import { setAuthUser, setSigningUp } from "../redux/slices/authSlice";
import toast from "react-hot-toast";


interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}
export const UseSignUpActions = () => {
    const dispatch = useDispatch();
    const [signup ] = useSignupMutation();
    // console.log(error)
    const handleSignUp = async (formData: SignUpFormData) => {
        try {
            dispatch(setSigningUp(true));
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
            dispatch(setSigningUp(false));
        }
    }

    return { handleSignUp }
}