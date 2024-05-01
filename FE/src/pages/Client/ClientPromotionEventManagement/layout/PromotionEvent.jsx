import { useEffect, useState } from "react";
import { usePromotionEvent } from "../hooks/usePromotionEvent";
import { Carousel } from "antd";
import { ModalDetailComponent } from "../components/ModalDetailComponent";


export const PromotionEvent = () => {

    //custom hooks
    const {
        listPromotionEvent,
        handleFetchDetailPromotionEvent, dataDetail
    } = usePromotionEvent();
    //open modal
    const [openModal, setOpenModal] = useState(false)
    //state
    const [peId, setPeId] = useState("");
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        if (firstRender) {
            handleFetchDetailPromotionEvent(peId)
        } else {
            setFirstRender(true);
        }
    }, [peId]);

    //setting Slide Show
    const settingCarousel = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <>
            {<ModalDetailComponent openModal={openModal} setOpenModal={setOpenModal} PEDetail={dataDetail} key={"ModalDetailComponent"} />}
            <div className="mt-[80px] bg-[#1a1d29] py-[50px]">
                <div className="max-w-[90%] mx-auto text-[#FFF]">
                    <p className="font-bold text-[25px] text-center pb-[30px]">Khuyến mãi</p>
                    <Carousel
                        {...settingCarousel}
                        className="text-[#FFF]"
                    >
                        {listPromotionEvent.map((item, index) => (
                            <div className="cursor-grab pb-[70px] px-[20px]" key={index}>
                                <img onClick={() => {
                                    setPeId(item.id);
                                    setOpenModal(true);
                                }} src={item.image} />
                                <p className="my-[10px] cursor-pointer hover:text-[#72be43] text-[var(--primary-limegreen)] font-bold text-[18px]">{item.name}</p>
                                <p>Thời gian khuyến mãi: {item.dateStart} - {item.dateEnd}</p>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    )

}