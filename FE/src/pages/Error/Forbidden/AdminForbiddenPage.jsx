import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoadingTrue, setLoadingFalse } from "../../../app/Redux/Slice/LoadingSlice";
import { ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME, ROUTE_ADMIN_MANAGEMENT_WELCOME, ROUTE_STAFF_MANAGEMENT_WELCOME } from "../../../app/BaseUrl/BaseUrl";
import { ExtractInforToken } from "../../../utils/Extract/ExtractInforToken";
import { useEffect } from "react";
import { ROLE_ADMIN, ROLE_ADMIN_AREA, ROLE_STAFF } from "../../../app/Constant/RoleConstant";

export const AdminForbiddenPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirectToAdminPage = () => {
        dispatch(setLoadingTrue());
        setTimeout(() => {
            const role = ExtractInforToken().roles[0].authority;
            if (role === ROLE_ADMIN) {
                navigate(ROUTE_ADMIN_MANAGEMENT_WELCOME);
            } else if (role === ROLE_ADMIN_AREA) {
                navigate(ROUTE_ADMIN_AREA_MANAGEMENT_WELCOME);
            } else if (role === ROLE_STAFF) {
                navigate(ROUTE_STAFF_MANAGEMENT_WELCOME);
            }
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