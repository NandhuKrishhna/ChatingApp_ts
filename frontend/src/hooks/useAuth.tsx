import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser, setAuthUser, setCheckingAuth } from "../redux/slices/authSlice";
import { useCheckAuthQuery } from "../redux/api/authApi";
import { useEffect } from "react";

export const useAuth = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(selectAuthUser);
    const { 
        data: user, 
        isLoading,
        error 
    } = useCheckAuthQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        if (isLoading) {
            dispatch(setCheckingAuth(true)); 
        } else {
            dispatch(setCheckingAuth(false)); 
        }

        if (user) {
            dispatch(setAuthUser(user));
        }

        if (error) {
            console.log("Error in checking auth",error)
            dispatch(setAuthUser(null));
        }
    }, [user, error, dispatch, isLoading]);

    return { authUser, isLoading, error };
};
