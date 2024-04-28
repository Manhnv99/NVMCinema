import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoadingTrue, setLoadingFalse } from "../../../app/Redux/Slice/LoadingSlice";
import { ROUTE_ADMIN_MANAGEMENT_WELCOME } from "../../../app/BaseUrl/BaseUrl";

export const ForbiddenPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirectToAdminPage = () => {
        dispatch(setLoadingTrue());
        setTimeout(() => {
            navigate(ROUTE_ADMIN_MANAGEMENT_WELCOME);
            dispatch(setLoadingFalse());
        }, [200]);
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen font-mono font-bold">
                <div className="text-center">
                    <p className="text-5xl">403</p>
                    <p className="text-3xl">Forbidden</p>
                    <p onClick={handleRedirectToAdminPage} className="cursor-pointer">Trở về</p>
                </div>
            </div>
        </>
    )

}