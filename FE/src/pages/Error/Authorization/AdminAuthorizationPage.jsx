import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoadingTrue, setLoadingFalse } from "../../../app/Redux/Slice/LoadingSlice";
import { ROUTE_LOGIN } from "../../../app/BaseUrl/BaseUrl";

export const AdminAuthorizationPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirectToLoginPage = () => {
        dispatch(setLoadingTrue());
        setTimeout(() => {
            navigate(ROUTE_LOGIN);
            dispatch(setLoadingFalse());
        }, [200]);
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen font-mono font-bold">
                <div className="text-center">
                    <p className="text-5xl">401</p>
                    <p className="text-3xl">Authorization</p>
                    <p onClick={handleRedirectToLoginPage} className="cursor-pointer">Trở về đăng nhập</p>
                </div>
            </div>
        </>
    )

}