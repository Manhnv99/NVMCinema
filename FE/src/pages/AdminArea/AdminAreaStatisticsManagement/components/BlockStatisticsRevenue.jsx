import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";
import { useBlockStatisticsRevenue } from "../hooks/useBlockStatisticsRevenue"


export const BlockStatisticsRevenue = () => {

    const {
        revenueForYear, revenueForMonth, revenueForToday
    } = useBlockStatisticsRevenue();

    return (
        <>
            <div className="grid grid-cols-3 gap-10 my-[20px]">
                <div className="bg-[#0794a1] rounded-md text-[#FFF] py-[10px]">
                    <p className="text-center font-bold text-[23px]">Doanh số năm nay</p>
                    <div className="grid grid-cols-2 text-center">
                        <p className="font-bold text-[16px] my-[5px]">Số vé</p>
                        <p className="font-bold text-[16px] my-[5px]">Tổng tiền</p>
                        <p>{revenueForYear.ticketSold}</p>
                        <p>{ConvertCurrencyVND(revenueForYear.totalRevenue)}</p>
                    </div>
                </div>
                <div className="bg-[#3f82f7] rounded-md text-[#FFF] py-[10px]">
                    <p className="text-center font-bold text-[23px]">Doanh số tháng này</p>
                    <div className="grid grid-cols-2 text-center">
                        <p className="font-bold text-[16px] my-[5px]">Số vé</p>
                        <p className="font-bold text-[16px] my-[5px]">Tổng tiền</p>
                        <p>{revenueForMonth.ticketSold}</p>
                        <p>{ConvertCurrencyVND(revenueForMonth.totalRevenue)}</p>
                    </div>
                </div>
                <div className="bg-[#0d9c6d] rounded-md text-[#FFF] py-[10px]">
                    <p className="text-center font-bold text-[23px]">Doanh số hôm nay</p>
                    <div className="grid grid-cols-2 text-center">
                        <p className="font-bold text-[16px] my-[5px]">Số vé</p>
                        <p className="font-bold text-[16px] my-[5px]">Tổng tiền</p>
                        <p>{revenueForToday.ticketSold}</p>
                        <p>{ConvertCurrencyVND(revenueForToday.totalRevenue)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}