import { Calendar, Tag, theme } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NVMLogic from "../../../../assets/NVM.png";
import { useBookTicket } from "../hooks/useBookTicket";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";
import { setBookTicketProgress } from "../../../../app/Redux/Slice/BookTicketSlice";
import { AREA_CLIENT } from "../../../../app/Constant/TokenConstant";

export const BookTicket = () => {
    let isMovieEmpty = 0;

    //useSelector
    const bookTicketProgress = useSelector(state => state.bookTicket.bookTicketProgress);
    //useNavigate
    const navigate = useNavigate();
    //dispatch
    const dispatch = useDispatch();
    const { token } = theme.useToken();
    //movieId
    const { movieId } = useParams();
    //list
    const [listBranch, setListBranch] = useState([]);
    const [listShowTime, setListShowTime] = useState([]);
    //dateChoose
    const [dateChoose, setDateChoose] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const areaChange = useSelector(state => state.area.areaChange);
    //custom hooks
    const {
        handleFetchListBranch,
        handleFetchListShowTime,
        handleFetchClosestScreeningDate
    } = useBookTicket();

    //use for Fetch List ShowTime Movie Today
    useEffect(() => {
        handleFetchListShowTimeByBranch();
    }, [dateChoose, areaChange]);

    //To fetch ScreeningDate
    useEffect(() => {
        handleFetchClosestScreeningDate(movieId).then(closestScreeningDate => {
            setDateChoose(closestScreeningDate);
        });
    }, []);

    const handleFetchListShowTimeByBranch = () => {
        dispatch(setLoadingTrue());
        setTimeout(() => {
            handleFetchListBranch().then(branch => {
                const listBranchId = branch.map(item => item.id);
                setListBranch(branch);
                handleFetchListShowTime(movieId, listBranchId.join(","), localStorage.getItem(AREA_CLIENT), dateChoose).then(response => {
                    setListShowTime(response);
                    dispatch(setLoadingFalse());
                });
            });
        }, [1000]);
    };

    //For disable the past for Component Carlendar
    const isPast = (date) => {
        return dayjs(date).format("YYYY-MM-DD") < dayjs(new Date()).format("YYYY-MM-DD");
    };

    return (
        <>
            <div className="mt-[80px] bg-[#1a1d29]">
                <div className="max-w-[80%] mx-auto pb-[50px]">
                    <p className="text-center text-[#FFF] font-bold text-[22px] md:text-[26px] py-[30px]">Bước {bookTicketProgress}: Chọn thời gian và địa điểm</p>
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
                                    onChange={(date) => {
                                        setDateChoose(dayjs(date).format("YYYY-MM-DD"));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8 border border-[#454D6A] rounded-md px-[25px]">
                            {listBranch.map((branch, index) => {
                                const showTimesForBranch = listShowTime.filter(item => item.branchId === branch.id);
                                if (showTimesForBranch.length > 0) {
                                    return (
                                        <div key={index} className="p-[15px] rounded-[9px] border border-[#454D6A] my-[25px]">
                                            <p className="flex items-center">
                                                <img className="rounded-[50%] w-[25px] h-[25px] border border-p-[#FFF] mr-[10px]" src={NVMLogic} />
                                                <span className="text-[#FFF] text-[17px]">{branch.name}</span>
                                            </p>
                                            <p className="text-[#FFF] text-[14px] mt-[10px]">{branch.address}</p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                                {showTimesForBranch.map((item, index) => (
                                                    <div key={index} className="mt-[20px]">
                                                        <div onClick={() => {
                                                            dispatch(setBookTicketProgress(bookTicketProgress + 1));
                                                            navigate(`/dat-cho-ngoi/${item.showTimeId}`);
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
                                        </div>
                                    );
                                } else {
                                    isMovieEmpty++;
                                }
                            })}
                            {isMovieEmpty === listBranch.length && (
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