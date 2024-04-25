import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd"
import { PAYMENT_SUCCESS } from "../../../../app/Constant/InternetBanking";
import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";
import { useNavigate } from "react-router-dom";
import { ROUTE_CLIENT_HOME } from "../../../../app/BaseUrl/BaseUrl";


export const ModalPayment = ({ openModal, setOpenModal, paramsPayment }) => {

    const navigate = useNavigate();

    return (
        <>
            <Modal
                title="Thông tin thanh toán"
                okText="Đóng"
                cancelText="Trở về trang chủ"
                onOk={() => setOpenModal(false)}
                open={openModal}
                onCancel={() => navigate(ROUTE_CLIENT_HOME)}
            >
                {paramsPayment.code === PAYMENT_SUCCESS
                    ?
                    <div className="text-center">
                        <FontAwesomeIcon className="text-[green] text-[50px]" icon={faCircleCheck} />
                        <p className="font-bold text-[20px] my-[10px]">Thanh toán thành công</p>
                        <p>Tổng thanh toán: {ConvertCurrencyVND(paramsPayment.totalPrice / 100)}</p>
                    </div>
                    :
                    <div className="text-center">
                        <FontAwesomeIcon className="text-[red] text-[50px]" icon={faTriangleExclamation} />
                        <p className="font-bold text-[20px] my-[10px]">Thanh toán thất bại</p>
                    </div>
                }
            </Modal>
        </>
    )
}