import { faArrowLeft, faShieldHalved } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTE_CLIENT_HOME } from "../../../app/BaseUrl/BaseUrl"


export const NotExist = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="mt-[80px] bg-[#1a1d29] text-[#FFF]">
                <div className="max-w-[80%] mx-auto text-center py-[50px]">
                    <FontAwesomeIcon className="text-[80px]" icon={faShieldHalved} />
                    <p className="text-[#5b5d65] font-bold text-[110px] leading-[1]">
                        404
                    </p>
                    <p className="font-bold mt-[20px] text-[30px]">Xin lỗi, trang này không tồn tại!</p>
                    <p className="text-[20px] mt-[10px]">Không có nội dung ở trang này. Vui lòng thử lại ở đường link khác!</p>
                    <Button onClick={() => navigate(ROUTE_CLIENT_HOME)} className="mt-[20px]">
                        <FontAwesomeIcon className="mr-[10px]" icon={faArrowLeft} />
                        Quay lại trang chủ
                    </Button>
                </div>
            </div>
        </>
    )

}