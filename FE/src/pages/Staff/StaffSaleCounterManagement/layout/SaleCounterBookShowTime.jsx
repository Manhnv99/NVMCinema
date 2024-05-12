import { Calendar, Tag, theme } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { SaleCounterContext } from "../store/context/context";
import { useBookShowTime } from "../hooks/useBookShowTime";
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken";
import { setBookTicketProgressAction } from "../store/actions/SaleCounterAction";

export const SaleCounterBookShowTime = () => {
    //useContext
    const [state, dispatch] = useContext(SaleCounterContext);
    //useNavigate
    const navigate = useNavigate();
    //dispatch
    const dispatchStore = useDispatch();
    const { token } = theme.useToken();
    //movieId
    const { movieId } = useParams();
    //list
    const [listShowTime, setListShowTime] = useState([]);
    //dateChoose
    const [dateChoose, setDateChoose] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const areaChange = useSelector(state => state.area.areaChange);
    //custom hooks
    const {
        handleFetchListShowTime,
        handleFetchClosestScreeningDate
    } = useBookShowTime();

    //use for Fetch List ShowTime Movie Today
    useEffect(() => {
        dispatchStore(setLoadingTrue());
        setTimeout(() => {
            handleFetchListShowTime(movieId, ExtractInforToken().branchId, dateChoose).then(response => {
                setListShowTime(response);
                dispatchStore(setLoadingFalse());
            });
        }, [1000]);
    }, [dateChoose, areaChange]);

    //To fetch ScreeningDate
    useEffect(() => {
        handleFetchClosestScreeningDate(movieId).then(closestScreeningDate => {
            setDateChoose(closestScreeningDate);
        });
    }, []);

    //For disable the past for Component Carlendar
    const isPast = (date) => {
        return dayjs(date).format("YYYY-MM-DD") < dayjs(new Date()).format("YYYY-MM-DD");
    };

    return (
        <>
            <div className="bg-[#1a1d29] rounded-md h-full shadow-xl">
                <div className="max-w-[95%] mx-auto pb-[50px]">
                    <p className="text-center text-[#FFF] font-bold text-[22px] md:text-[26px] py-[30px]">Bước {state.bookTicketProgress}: Chọn thời gian và địa điểm</p>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-4 border border-[#454D6A] rounded-md p-[25px]">
                            <div className=" rounded-[9px] border border-[#454D6A]">
                                <Calendar
                                    disabled={isPast}
                                    disabledDate={isPast}
                                    value={dayjs(dateChoose)}
                                    style={{
                                        width: "100%",
                                        border: `1px solid ${token.colorBorderSecondary}`,
                                        borderRadius: token.borderRadiusLG
                                    }}
                                    fullscreen={false}
                                    onChange={(date) => setDateChoose(dayjs(date).format("YYYY-MM-DD"))}
                                />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8 border border-[#454D6A] rounded-md px-[25px]">
                            <div className="grid sm:grid-cols-2 md:grid-cols-6 gap-5">
                                {listShowTime.map((item, index) => (
                                    <div key={index} className="mt-[20px] sm:grid-cols-2 md:col-span-2">
                                        <div onClick={() => {
                                            dispatch(setBookTicketProgressAction(state.bookTicketProgress + 1));
                                            navigate(`/staff/management-sale-counter/dat-cho-ngoi/${item.showTimeId}`);
                                        }} className="cursor-pointer hover:bg-[var(--primary-limegreen)] duration-[0.3s] bg-[#454d6a] flex items-center justify-center rounded-md text-[#FFF] h-[55px]">
                                            <p>{item.timeStart}</p>
                                        </div>
                                        <div className="text-center mt-[5px]">
                                            <Tag color="yellow">{item.subTitle}</Tag>
                                            <Tag color="green">{item.format}</Tag>
                                            <Tag color="blue">{item.roomName}</Tag>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {listShowTime.length === 0 && (
                                <div className="mt-[20px] text-center">
                                    <span className="text-[#FFF] text-[20px]">Không có xuất chiếu nào vui lòng chọn ngày khác!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}