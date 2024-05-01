import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd"
import { PAYMENT_SUCCESS } from "../../../../app/Constant/InternetBanking";
import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";
import { BillPrintComponent } from "./BillPrintComponent";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const ModalPayment = ({ openModal, setOpenModal, paramsPayment }) => {

    //use Ref
    const componentRef = useRef(null);


    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <>
            {<BillPrintComponent ref={componentRef} />}
            <Modal
                title="Thông tin thanh toán"
                okText="Đóng"
                cancelButtonProps={{
                    style: {
                        display: "none"
                    }
                }}
                onOk={() => {
                    handlePrint();
                    setOpenModal(false);
                }}
                open={openModal}
            >
                {paramsPayment.orderStatus === PAYMENT_SUCCESS
                    ?
                    <div className="text-center">
                        <FontAwesomeIcon className="text-[green] text-[50px]" icon={faCircleCheck} />
                        <p className="font-bold text-[18px] my-[10px]">Thanh toán thành công hóa đơn: {paramsPayment.orderCode}</p>
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