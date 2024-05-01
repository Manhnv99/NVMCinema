import { forwardRef, useContext } from "react";
import "../style/style.css";
import { OrderContext } from "../store/context/context";
import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";
import dayjs from "dayjs";


export const BillPrintComponent = forwardRef((props, ref) => {

    const [state, dispatch] = useContext(OrderContext);

    return (
        <div className="p-[100px]" id="billId" style={{ display: "none" }} ref={ref}>
            <p className="font-bold uppercase text-[25px] text-center">Ve Xem Phim</p>
            <div className="border-b border-dashed border-[#999]">
                <p className="flex"><span className="font-bold">Hóa đơn: </span> {state.detailOrder.orderCode}</p>
                <p >
                    <span className="font-bold">Địa chỉ: </span>
                    <span className="uppercase">
                        Cong ty cnhh nvm vietnam - Chi nhanh: {state.detailOrder.branchAddress}
                    </span>
                </p>
            </div>
            <div className="flex border-b border-dashed border-[#999]">
                <p className="font-bold">NVM Cinema: </p>
                <p className="">{dayjs(state.detailOrder.dateBuy).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>
            <div className="border-b border-dashed border-[#999]">
                <p><span className="font-bold">Phim:</span> {state.detailOrder.movieName}</p>
                <p><span className="font-bold">Thời gian:</span> {state.detailOrder.screeningDate} / {state.detailOrder.timeStart}</p>
                <p><span className="font-bold">Đồ ăn:</span> {state.detailOrder.food === null ? "not" : state.detailOrder.food}</p>
                <p><span className="font-bold">Ghế ngồi:</span> {state.detailOrder.chairName}</p>
            </div>
            <div>
                <p><span className="font-bold">Giảm giá:</span> {state.detailOrder.promotion === null ? "not" : state.detailOrder.promotion}</p>
                <p><span className="font-bold">Tổng thanh toán:</span> {ConvertCurrencyVND(state.detailOrder.totalPrice)}</p>
            </div>
        </div>
    );
});

BillPrintComponent.displayName = "BillPrintComponent";