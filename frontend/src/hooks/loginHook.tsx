import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";
import { setAuthUser, setLoggingIn } from "../redux/slices/authSlice";

type LoginParams = {
    email: string;
    password: string;
};

export const useLogin = () => {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    const loginHandler = async (data: LoginParams) => {
        dispatch(setLoggingIn(true));

        try {
            const res = await login(data).unwrap();
            toast.success("Logged In Successfully");
            dispatch(setAuthUser(res));
        } catch (error: any) {
            console.log("Login error:", error);
            const errorMessage = error?.data?.message || "An error occurred during login";
            toast.error(errorMessage);
            if (error?.data?.errors) {
                console.error("Validation errors:", error.data.errors);
            }
        } finally {
            dispatch(setLoggingIn(false));
        }
    };

    return { loginHandler };
};