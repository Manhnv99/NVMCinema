import { faArrowLeft, faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import seatScreenImage from "../../../../assets/seatScreen.png";
import { useEffect, useState } from "react";
import { useBookChair } from "../hooks/useBookChair";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

export const BookChair = () => {

    //useNav
    const navigate = useNavigate();
    //useSelector
    const bookTicketProgress = useSelector(state => state.bookTicket.bookTicketProgress);
    //useDispatch
    const dispatch = useDispatch();
    //custom hooks
    const {
        handleFetchListTicketChair, listChair,
        handleFetchDetailShowTime, detailShowTime
    } = useBookChair();
    //showTimeId
    const { showTimeId } = useParams();
    //list TicketChair and Food
    const [listTicketChair, setListTicketChair] = useState([]);
    const [listFood, setListFood] = useState([]);

    useEffect(() => {
        handleFetchListTicketChair(showTimeId);
        handleFetchDetailShowTime(showTimeId);
        console.log(document.referrer);
    }, []);

    //handle Function
    const handleChooseTicketChair = (e, ticketChairId, ticketChairName, ticketPrice) => {
        e.target.classList.toggle('text-[var(--primary-limegreen)]');
        const storeTicketChair = [];
        listTicketChair.forEach(item => {
            storeTicketChair.push(item.ticketChairId)
        });
        if (storeTicketChair.includes(ticketChairId)) {
            setListTicketChair(listTicketChair.filter(item => item.ticketChairId != ticketChairId));
        } else {
            setListTicketChair([{
                ticketChairId: ticketChairId,
                ticketChairName: ticketChairName,
                ticketPrice: ticketPrice
            }, ...listTicketChair]);
        }
    };

    return (
        <>
            <div className="mt-[80px] bg-[#1a1d29]">
                <div className="max-w-[80%] mx-auto pb-[50px] text-[#FFF]">
                    <p className="text-center  font-bold text-[22px] md:text-[26px] py-[30px]">Bước {bookTicketProgress}: Chọn ghế ngồi</p>
                    <div className="grid grid-cols-12 gap-4 mt-[20px]">
                        <div className="col-span-12 xl:col-span-8">
                            <div className="text-center">
                                <div className="mb-[20px]">
                                    <img className="w-full" src={seatScreenImage} />
                                </div>
                                <div className="mb-[30px] mt-[40px] flex justify-evenly items-center">
                                    <div className="flex justify-center items-center mr-[20px]">
                                        <FontAwesomeIcon icon={faCouch} className="text-[35px]" />
                                        <span className="font-semibold text-[16px] ml-[5px]">Ghế chưa bán</span>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <FontAwesomeIcon icon={faCouch} className="text-[35px] text-[red]" />
                                        <span className="font-semibold text-[16px] ml-[5px]">Ghế đã bán</span>
                                    </div>
                                </div>
                                {listChair.map((item, index) => {
                                    return (
                                        <>
                                            {(index % 10 === 0) &&
                                                <span className="relative cursor-pointer">
                                                    <span className="absolute top-[-25px] left-[-25px] text-[18px]">{item.name.substring(0, 1)}</span>
                                                </span>
                                            }
                                            <span className="relative cursor-pointer">
                                                {item.status
                                                    ?
                                                    <>
                                                        <FontAwesomeIcon icon={faCouch} className="text-[35px] mx-[13px] my-[10px] text-[red]" />
                                                    </>
                                                    :
                                                    <FontAwesomeIcon onClick={(e) => {
                                                        handleChooseTicketChair(e, item.id, item.name, item.price);
                                                    }} icon={faCouch} className="text-[35px] mx-[13px] my-[10px]" />
                                                }
                                            </span>
                                            {(index + 1) % 10 === 0 && <br />}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4">
                            <div className="border border-[#454D6A] rounded-md">
                                <div className="border-b border-[#454D6A]">
                                    <div className="p-[15px]">
                                        <span className=" font-bold text-[18px]">{detailShowTime.branchName}</span>
                                        <p>
                                            <span className="text-[var(--primary-limegreen)]">{detailShowTime.roomName}</span>
                                            <span> - {detailShowTime.screeningDate}</span>
                                            <span> - Suất chiếu: {dayjs(detailShowTime.timeStart, "hh:mm:ss").format("hh:mm")}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="border-b border-[#454D6A]">
                                    <div className="p-[15px]">
                                        <span className="font-bold text-[20px] uppercase text-[var(--primary-limegreen)]">
                                            {detailShowTime.movieName}
                                        </span>
                                        <div className="mt-[10px] uppercase">
                                            {detailShowTime.ageRestriction >= 18
                                                ?
                                                <Tag color="red">T18</Tag>
                                                :
                                                <Tag color="green">D18</Tag>
                                            }
                                            <Tag color="yellow">
                                                {detailShowTime.subtitle}
                                            </Tag>
                                            <Tag color="green">
                                                {detailShowTime.format}
                                            </Tag>
                                        </div>
                                        {listTicketChair.length > 0 &&
                                            <div className="my-[10px] flex justify-between">
                                                <div>
                                                    <p>{listTicketChair.length} x Adult-Stand</p>
                                                    <span>{listTicketChair.map(item => item.ticketChairName).join(", ")}</span>
                                                </div>
                                                <div>
                                                    <span>{listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="my-[20px] text-center px-[15px]">
                                    {listTicketChair.length > 0
                                        ?
                                        <>
                                            <div className="flex justify-between">
                                                <p className="font-semibold text-[#fafafa] text-[18px]">Tổng tiền</p>
                                                <p className="font-bold text-[#FFF] text-[22px]">
                                                    {listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
                                            </div>
                                            <button className="font-bold text-[18px] mt-[20px] mb-[10px] bg-[var(--primary-limegreen)] w-full h-[45px] rounded-md uppercase outline-none">
                                                Chọn Đồ Ăn ({bookTicketProgress}/4)
                                            </button>
                                        </>
                                        :
                                        <span className="border border-[red] py-[5px] px-[20px] rounded-md">Bạn chưa chọn ghế nào. Vui lòng chọn ghế.</span>
                                    }
                                    <p onClick={() => {
                                        navigate(window.history.go(-1));
                                    }} className="text-[18px] cursor-pointer mt-[15px] mb-[10px]">
                                        <FontAwesomeIcon className="mr-[5px]" icon={faArrowLeft} />
                                        Trở lại
                                    </p>
                                    <p className="font-semibold">Còn lại:
                                        <span className="text-[red]"> 6 phút, 13 giây</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}