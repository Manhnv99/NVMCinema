import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCouch, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Image, Tag, Tooltip } from "antd";
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
import VNPAY_LOGO from "../../../../assets/vnpay.png";
import { PAYMENT_BY_CASH, PAYMENT_BY_IB_VNPAY } from "../../../../app/Constant/InternetBanking";
import { messageWarResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken";
import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";
import Swal from "sweetalert2";

export const SaleCounterBookChair = () => {

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
        listComboFood,
        handleFetchPromotionEvent, promotionApplied,
        handleFetchOnlineBanking,
        handleFetchCashPayment
    } = useBookChair();
    //showTimeId
    const { showTimeId } = useParams();
    //list TicketChair and Food
    const [listTicketChair, setListTicketChair] = useState([]);
    const [listFood, setListFood] = useState([]);
    //value Input
    const [valuePromotionCode, setValuePromotionCode] = useState("");
    //which Enternet Banking
    const [whatKindOfPayment, setWhatKindOfPayment] = useState("");

    //fetch List ticketChair and Information Detail for this showTime 
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

    const handleSolveProgress = () => {
        if (bookTicketProgress === 4) { //nếu nó đang là ba thì bấm vào nó sẽ là 4 thì sẽ thực hiện logic ở đây
            if (whatKindOfPayment.length === 0) {
                messageWarResponse("Bạn Chưa Chọn Loại Ngân Hàng Để Thanh Toán!");
            } else {
                if (whatKindOfPayment === PAYMENT_BY_CASH) {
                    //xử lý tiền mặt
                    Swal.fire({
                        title: "Bạn có chắc muốn thanh toán hóa đơn này ?",
                        icon: "question",
                        showCancelButton: true,
                        allowOutsideClick: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleFetchCashPayment(paymentRequest);
                        }
                    });
                } else if (whatKindOfPayment === PAYMENT_BY_IB_VNPAY) {
                    //xử lý thanh toán vnpay
                    Swal.fire({
                        title: "Bạn có chắc muốn thanh toán hóa đơn này ?",
                        icon: "question",
                        showCancelButton: true,
                        allowOutsideClick: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleFetchOnlineBanking(paymentRequest);
                        }
                    });
                }
            }
        } else {
            dispatch(setBookTicketProgress(bookTicketProgress + 1));
        }
    };
    //paymentRequest
    const paymentRequest = {
        listTicketChairId: listTicketChair.map(item => {
            return item.ticketChairId;
        }),
        totalPrice: listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0) +
            listFood.reduce((avg, item) => avg + (item.comboFoodPrice * item.quantity), 0)
            - promotionApplied.price,
        promotionEventCode: promotionApplied.code,
        listComboFoodRequest: listFood.map(item => {
            return {
                comboFoodId: item.comboFoodId,
                quantity: item.quantity
            }
        }),
        userId: ExtractInforToken().userId
    };

    return (
        <>
            <div className="bg-[#1a1d29] rounded-md h-full">
                <div className="max-w-[95%] mx-auto pb-[50px] text-[#FFF]">
                    <p className="text-center  font-bold text-[22px] md:text-[26px] py-[30px]">
                        Bước {bookTicketProgress}:
                        {bookTicketProgress === 2 ? " Chọn ghế ngồi" :
                            bookTicketProgress === 3 ? " Chọn đồ ăn" : " Thanh toán"
                        }
                    </p>
                    <div className="grid grid-cols-12 gap-4 mt-[20px]">
                        <div className="col-span-12 xl:col-span-8">
                            {bookTicketProgress === 2 //Trạng thái bằng 2 thì sẽ là chọn ghế
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
                                                            <Tooltip
                                                                title={"Đã bán"}
                                                                color="red"
                                                                key={"chairSold"}
                                                            >
                                                                <FontAwesomeIcon icon={faCouch} className="text-[35px] mx-[13px] my-[10px] text-[red]" />
                                                            </Tooltip>
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
                                bookTicketProgress === 3 //Trạng thái bằng 3 thì sẽ là chọn đồ ăn
                                    ?
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
                                                            <span className="font-semibold text-[18px]">{ConvertCurrencyVND(item.price)}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    : //Trạng thái bằng 4 thì sẽ là nhập mã giảm giá và thanh toán
                                    <>
                                        <div className="border border-[#454D6A] rounded-md">
                                            <div className="p-[20px]">
                                                <span className="font-bold text-[18px]">Mã giảm giá</span>
                                            </div>
                                            <div className="p-[20px] border-t border-dashed border-[#999]">
                                                <input value={valuePromotionCode} onChange={(e) => setValuePromotionCode(e.target.value)} className="w-[85%] pl-[5px] py-[8px] outline-none border border-[#454D6A] rounded-md text-[16px] text-[#999] placeholder-gray-[#ccc]" placeholder="Nhập mã giảm giá tại đây..." />
                                                <button onClick={() => {
                                                    handleFetchPromotionEvent(valuePromotionCode);
                                                }} className="w-[15%] uppercase bg-[var(--primary-limegreen)] outline-none text-[16px] py-[8px]
                                                border border-[var(--primary-limegreen)] rounded-md font-bold">Áp dụng</button>
                                            </div>
                                        </div>
                                        <div className="border border-[#454D6A] rounded-md mt-[35px]">
                                            <div className="p-[20px]">
                                                <span className="font-bold text-[18px]">Hình thức thanh toán</span>
                                            </div>
                                            <div className="p-[20px] border-t border-dashed border-[#999] flex items-center">
                                                <input onChange={(e) => setWhatKindOfPayment(e.target.value)} value={PAYMENT_BY_CASH} className="w-[25px] h-[25px]" type="radio" name="whatKindOfPayment" />
                                                <FontAwesomeIcon icon={faWallet} className="w-[45px] h-[45px] rounded-md mx-[10px]" />
                                                <span className="font-semibold text-[18px]">Thanh toán bằng tiền mặt</span>
                                            </div>
                                            <div className="p-[20px] border-t border-dashed border-[#999] flex items-center">
                                                <input onChange={(e) => setWhatKindOfPayment(e.target.value)} value={PAYMENT_BY_IB_VNPAY} className="w-[25px] h-[25px]" type="radio" name="whatKindOfPayment" />
                                                <img src={VNPAY_LOGO} className="w-[45px] h-[45px] rounded-md mx-[10px]" />
                                                <span className="font-semibold text-[18px]">Thanh toán qua VNPAY (Visa, Master , Amex , JCB ,...)</span>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                        {/* Infor Detail Order */}
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
                                                        <span>{ConvertCurrencyVND(listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0))}</span>
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
                                                                        <span>{ConvertCurrencyVND(foodExist.comboFoodPrice * foodExist.quantity)}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                })}
                                                {promotionApplied.code !== "" && promotionApplied.price !== 0 &&
                                                    <div className="py-[10px] flex justify-between border-t border-dashed border-[#999]">
                                                        <div>
                                                            <p>Code: {promotionApplied.code}</p>
                                                        </div>
                                                        <div>
                                                            <span>{ConvertCurrencyVND(promotionApplied.price)}</span>
                                                        </div>
                                                    </div>
                                                }
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
                                                        ConvertCurrencyVND(listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0) +
                                                            listFood.reduce((avg, item) => avg + (item.comboFoodPrice * item.quantity), 0)
                                                            - promotionApplied.price)
                                                        :
                                                        ConvertCurrencyVND(listTicketChair.reduce((avg, item) => avg + item.ticketPrice, 0))
                                                    }
                                                </p>
                                            </div>
                                            <button onClick={handleSolveProgress} className="font-bold text-[18px] mt-[20px] mb-[10px] bg-[var(--primary-limegreen)] w-full h-[45px] rounded-md uppercase outline-none">
                                                {bookTicketProgress === 2 ? "Chọn ghế ngồi " :
                                                    bookTicketProgress === 3 ? "Chọn Đồ Ăn " : "Thanh toán "
                                                } ({bookTicketProgress}/4)
                                            </button>
                                        </>
                                        :
                                        <span className="border border-[red] py-[5px] px-[20px] rounded-md">Bạn chưa chọn ghế nào. Vui lòng chọn ghế.</span>
                                    }
                                    <p onClick={() => {
                                        if (bookTicketProgress > 2) {
                                            if (bookTicketProgress === 3) {
                                                setListTicketChair([]);
                                            }
                                            dispatch(setBookTicketProgress(bookTicketProgress - 1));
                                        } else {
                                            navigate(window.history.go(-1));
                                        }
                                    }} className="text-[18px] cursor-pointer mt-[15px] mb-[10px]">
                                        <FontAwesomeIcon className="mr-[5px]" icon={faArrowLeft} />
                                        Trở lại
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