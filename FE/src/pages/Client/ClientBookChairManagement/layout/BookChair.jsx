import { faArrowLeft, faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import seatScreenImage from "../../../../assets/seatScreen.png";
import { useEffect, useState } from "react";
import { useBookChair } from "../hooks/useBookChair";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setBookTicketProgress } from "../../../../app/Redux/Slice/BookTicketSlice";
import {
    MinusCircleOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';

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
        handleFetchDetailShowTime, detailShowTime,
        listComboFood
    } = useBookChair();
    //showTimeId
    const { showTimeId } = useParams();
    //list TicketChair and Food
    const [listTicketChair, setListTicketChair] = useState([]);
    const [listFood, setListFood] = useState([]);

    useEffect(() => {
        dispatch(setBookTicketProgress(2));
        handleFetchListTicketChair(showTimeId);
        handleFetchDetailShowTime(showTimeId);

        return () => {
            dispatch(setBookTicketProgress(1));
        }
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

    const handlePlusComboFood = (comboFoodId, comboFoodName, comboFoodPrice) => {
        const existingFood = listFood.find(item => item.comboFoodId === comboFoodId);
        if (existingFood) {
            //nếu có sản phẩm này rồi thì sẽ thực hiện cộng thêm 1 vào trường quantity
            const newListFood = listFood.map(item =>
                item.comboFoodId === comboFoodId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setListFood(newListFood);
        } else {
            //nếu chưa có sản phẩm này thì sẽ đẩy vào giỏ
            setListFood([{
                comboFoodId: comboFoodId,
                comboFoodName: comboFoodName,
                comboFoodPrice: comboFoodPrice,
                quantity: 1
            }, ...listFood]);
        }
    };

    const handleMinusComboFood = (comboFoodId) => {
        const existingFood = listFood.find(item => item.comboFoodId === comboFoodId);
        //nếu tìm trong mảng listFood có phần tử thỏa mãn thì xử lý
        if (existingFood.quantity !== 0) { //xem xét xem obj đó quantity của nó là 0
            if (existingFood.quantity === 1) { //quantity là 1 thì sẽ xóa nó khỏi list
                setListFood(listFood.filter(item => item.comboFoodId !== comboFoodId));
            } else { //thực hiện trừ số lượng
                const newListFood = listFood.map(item =>
                    item.comboFoodId === comboFoodId ? { ...item, quantity: item.quantity - 1 } : item
                );
                setListFood(newListFood);
            }
        }
    };

    return (
        <>
            <div className="mt-[80px] bg-[#1a1d29]">
                <div className="max-w-[80%] mx-auto pb-[50px] text-[#FFF]">
                    <p className="text-center  font-bold text-[22px] md:text-[26px] py-[30px]">Bước {bookTicketProgress}: Chọn ghế ngồi</p>
                    <div className="grid grid-cols-12 gap-4 mt-[20px]">
                        <div className="col-span-12 xl:col-span-8">
                            {bookTicketProgress === 2
                                ?
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
                                :
                                <div className="border border-[#454D6A] rounded-md">
                                    <div className="p-[15px]">
                                        {listComboFood.map((item, index) => {
                                            return (
                                                <div key={index} className="flex justify-between items-center py-[20px]">
                                                    <div className="flex items-center">
                                                        <Image style={{
                                                            width: "150px",
                                                            height: "100px",
                                                            objectFit: "cover",
                                                            borderRadius: "5px"
                                                        }} src={item.imageUrl} />
                                                        <div className="ml-[10px]">
                                                            <p className="font-semibold">{item.name}</p>
                                                            <div className="mt-[30px]">
                                                                <MinusCircleOutlined onClick={() => {
                                                                    handleMinusComboFood(item.id);
                                                                }} className="rounded-[50%] text-[#FFF] bg-[#ccc] text-[20px] cursor-pointer" />
                                                                <span className="mx-[10px]">
                                                                    {listFood.length > 0
                                                                        ?
                                                                        listFood.reduce((total, food) => {
                                                                            if (food.comboFoodId === item.id) {
                                                                                return total + food.quantity;
                                                                            }
                                                                            return total;
                                                                        }, 0)
                                                                        :
                                                                        "0"
                                                                    }
                                                                </span>
                                                                <PlusCircleOutlined onClick={() => {
                                                                    handlePlusComboFood(item.id, item.name, item.price);
                                                                }} className="rounded-[50%] text-[#FFF] text-[20px] bg-[var(--primary-limegreen)] cursor-pointer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-[18px]">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
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
                                            <>
                                                <div className="my-[10px] flex justify-between">
                                                    <div>
                                                        <p>{listTicketChair.length} x Adult-Stand</p>
                                                        <span>{listTicketChair.map(item => item.ticketChairName).join(", ")}</span>
                                                    </div>
                                                    <div>
                                                        <span>{listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                                                    </div>
                                                </div>

                                                {listComboFood.map((item, index) => {
                                                    if (listFood.length > 0) {
                                                        const foodExist = listFood.find(food => food.comboFoodId === item.id);
                                                        if (foodExist) {
                                                            return (
                                                                <div key={index} className="py-[10px] flex justify-between border-t border-dashed border-[#999]">
                                                                    <div>
                                                                        <p>{foodExist.quantity} x {foodExist.comboFoodName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <span>{(foodExist.comboFoodPrice * foodExist.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                })}
                                            </>
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
                                                    {listFood.length > 0
                                                        ?
                                                        (
                                                            listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0) +
                                                            listFood.reduce((avg, item) => avg + (item.comboFoodPrice * item.quantity), 0)
                                                        ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                        :
                                                        (
                                                            listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0)
                                                        ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                    }
                                                    VND
                                                </p>
                                            </div>
                                            <button onClick={() => {
                                                dispatch(setBookTicketProgress(bookTicketProgress + 1));
                                            }} className="font-bold text-[18px] mt-[20px] mb-[10px] bg-[var(--primary-limegreen)] w-full h-[45px] rounded-md uppercase outline-none">
                                                {bookTicketProgress === 2
                                                    ?
                                                    <span>
                                                        Chọn ghế ngồi ({bookTicketProgress}/4)
                                                    </span>
                                                    :
                                                    bookTicketProgress === 3 ?
                                                        <span>
                                                            Chọn Đồ Ăn ({bookTicketProgress}/4)
                                                        </span>
                                                        :
                                                        ""
                                                }
                                            </button>
                                        </>
                                        :
                                        <span className="border border-[red] py-[5px] px-[20px] rounded-md">Bạn chưa chọn ghế nào. Vui lòng chọn ghế.</span>
                                    }
                                    <p onClick={() => {
                                        if (bookTicketProgress === 3) {
                                            setListTicketChair([]);
                                            dispatch(setBookTicketProgress(bookTicketProgress - 1));
                                        } else {
                                            navigate(window.history.go(-1));
                                        }
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