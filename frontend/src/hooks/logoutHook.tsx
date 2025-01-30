import { useDispatch } from "react-redux";

import { setAuthUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../redux/api/authApi";


export const useLogout = () => {
    const dispatch = useDispatch();
    const [logout ] = useLogoutMutation();



    const handleLogout = async () => {
        try {
          await logout({}).unwrap();
          dispatch(setAuthUser(null));
          toast.success("Logged Out Successfully");
        } catch (error: any) {
          console.log("Logout error:", error);
          const errorMessage = error?.data?.message || "An error occurred during logout";
          toast.error(errorMessage);
          if (error?.data?.errors) {
            console.error("Validation errors:", error.data.errors);
          }
        }
      };
      
      

    return {handleLogout}
}