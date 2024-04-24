import Banner1 from "../../../../assets/banner1.jpg";
import Banner2 from "../../../../assets/banner2.jpg";
import { Carousel, Modal, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { faExclamation, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useHomePage } from "../hooks/useHomePage";
import { useState } from "react";
import { ModalDetailMovie } from "../components/ModalDetailMovie";
import { useNavigate } from "react-router-dom";


export const HomeClient = () => {

    //useNavigate
    const navigate = useNavigate();
    //custom Hooks
    const {
        listMovieCurrentShowing,
        listMoviePreTicket,
        listMovieUpComming
    } = useHomePage();
    //setting Slide Show
    const settingMovie = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };
    //open Modal
    const [openModalMovieDetail, setOpenModalMovieDetail] = useState(false);
    const [movieId, setMovieId] = useState("");

    const handleShowModalMovieDetail = (movieId) => {
        setMovieId(movieId);
        setOpenModalMovieDetail(true);
    }

    const handleBuyTicket = (ageRestriction, movieId) => {
        if (ageRestriction >= 18) {
            confirmWarning(movieId);
        } else {
            navigate(`/dat-ve/${movieId}`);
        }
    }

    const confirmWarning = (movieId) => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: "Phim này chỉ dành cho trẻ em trên 18 tuổi. Vui lòng cân nhắc khi mua vé.BQL Rạp sẽ phải từ chối cho vào nếu sai quy định.",
            okText: 'Tiếp tục',
            cancelText: 'Chọn Phim Khác',
            onOk: () => {
                navigate(`/dat-ve/${movieId}`);
            }
        });
    };

    return (
        <>
            {<ModalDetailMovie openModal={openModalMovieDetail} setOpenModal={setOpenModalMovieDetail} movieId={movieId} />}
            <div className="mt-[80px] max-w-[100%]">
                <Carousel autoplay>
                    <div>
                        <img src={Banner1} />
                    </div>
                    <div>
                        <img src={Banner2} />
                    </div>
                    <div>
                        <img src={Banner2} />
                    </div>
                </Carousel>
                <div className="bg-[#1a1d29]">
                    {/*Phim đang chiếu*/}
                    <div className="max-w-[90%] mx-auto mb-[50px]">
                        <h1 className="font-bold text-[25px] text-[#FFF] text-center pt-[20px]">Phim đang chiếu</h1>
                        <Carousel className="mt-[20px] pb-[50px]" {...settingMovie}>
                            {listMovieCurrentShowing.map(item => (
                                <div key={"CURRENSHOWING"} className="cursor-grab px-[12px]">
                                    <img onClick={() => {
                                        handleShowModalMovieDetail(item.id);
                                    }} className="rounded-md cursor-pointer" src={item.imageUrl} />
                                    <div className="my-[20px]">
                                        {item.ageRestriction >= 18
                                            ?
                                            <Tag color="red">T18</Tag>
                                            :
                                            <Tag color="green">D18</Tag>
                                        }
                                        <Tag color="yellow">
                                            {item.subTitle}
                                        </Tag>
                                        <Tag color="green">
                                            {item.format}
                                        </Tag>
                                    </div>
                                    <div className="uppercase font-bold text-[#FFF] text-[18px]">
                                        <span className="hover:text-[var(--primary-limegreen)] cursor-pointer
                                                duration-[0.3s]">
                                            {item.movie}
                                        </span>
                                    </div>
                                    <p className="text-[15px] font-semibold mt-[5px]">
                                        <span className="text-[#CCCCCC]">Thể loại phim: </span>
                                        <span className="text-[#FFF]">{item.genre}</span>
                                    </p>
                                    <div className="mt-[15px]">
                                        <button onClick={() => {
                                            handleBuyTicket(item.ageRestriction, item.id);
                                        }} className="w-[70%] h-[45px] rounded-md bg-[var(--primary-limegreen)] text-[#FFF]
                                                hover:bg-[#a1db4b] duration-300 ease-in-out">
                                            <FontAwesomeIcon icon={faTicket} className="mr-[10px] text-[20px]" />
                                            <span className="font-semibold text-[17px]">Mua Vé Ngay</span>
                                        </button>
                                        <button onClick={() => {
                                            handleShowModalMovieDetail(item.id);
                                        }} className="w-[18%] h-[45px] rounded-md bg-transparent text-[#FFF]
                                                ml-[10px] border border-[var(--primary-limegreen)] hover:bg-[var(--primary-limegreen)]
                                                hover:text-[#000] hover:border-[#FFF] duration-[0.5s]">
                                            <FontAwesomeIcon icon={faExclamation} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    {/*Vé bán trước*/}
                    <span className="bg-[#999] h-[2px] w-full block"></span>
                    <div className="max-w-[90%] mx-auto mb-[50px]">
                        <h1 className="font-bold text-[25px] text-[#FFF] text-center pt-[20px]">Vé bán trước</h1>
                        <Carousel className="mt-[20px] pb-[50px]" {...settingMovie}>
                            {listMoviePreTicket.map(item => (
                                <div key={"MOVIEPRETICKET"} className="cursor-grab px-[12px]">
                                    <img onClick={() => {
                                        handleShowModalMovieDetail(item.id);
                                    }} className="rounded-md cursor-pointer" src={item.imageUrl} />
                                    <div className="my-[20px]">
                                        {item.ageRestriction >= 18
                                            ?
                                            <Tag color="red">T18</Tag>
                                            :
                                            <Tag color="green">D18</Tag>
                                        }
                                        <Tag color="yellow">
                                            {item.subTitle}
                                        </Tag>
                                        <Tag color="green">
                                            {item.format}
                                        </Tag>
                                    </div>
                                    <div className="uppercase font-bold text-[#FFF] text-[18px]">
                                        <span className="hover:text-[var(--primary-limegreen)] cursor-pointer
                                                duration-[0.3s]">
                                            {item.movie}
                                        </span>
                                    </div>
                                    <p className="text-[15px] font-semibold mt-[5px]">
                                        <span className="text-[#CCCCCC]">Thể loại phim: </span>
                                        <span className="text-[#FFF]">{item.genre}</span>
                                    </p>
                                    <div className="mt-[15px]">
                                        <button onClick={() => {
                                            handleBuyTicket(item.ageRestriction, item.id);
                                        }} className="w-[70%] h-[45px] rounded-md bg-[var(--primary-limegreen)] text-[#FFF]
                                                hover:bg-[#a1db4b] duration-300 ease-in-out">
                                            <FontAwesomeIcon icon={faTicket} className="mr-[10px] text-[20px]" />
                                            <span className="font-semibold text-[17px]">Mua Vé Ngay</span>
                                        </button>
                                        <button onClick={() => {
                                            handleShowModalMovieDetail(item.id);
                                        }} className="w-[18%] h-[45px] rounded-md bg-transparent text-[#FFF]
                                                ml-[10px] border border-[var(--primary-limegreen)] hover:bg-[var(--primary-limegreen)]
                                                hover:text-[#000] hover:border-[#FFF] duration-[0.5s]">
                                            <FontAwesomeIcon icon={faExclamation} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    {/*Phim sắp chiếu*/}
                    <span className="bg-[#999] h-[2px] w-full block"></span>
                    <div className="max-w-[90%] mx-auto pb-[50px]">
                        <h1 className="font-bold text-[25px] text-[#FFF] text-center pt-[20px]">Phim sắp chiếu</h1>
                        <Carousel className="mt-[20px] pb-[50px]" {...settingMovie}>
                            {/* col 1 */}
                            {listMovieUpComming.map((item, index) => (
                                <div key={index} className="cursor-grab px-[12px]">
                                    <img onClick={() => {
                                        handleShowModalMovieDetail(item.id);
                                    }} className="rounded-md cursor-pointer" src={item.imageUrl} />
                                    <div className="my-[20px]">
                                        {item.ageRestriction >= 18
                                            ?
                                            <Tag color="red">T18</Tag>
                                            :
                                            <Tag color="green">D18</Tag>
                                        }
                                        <Tag color="yellow">
                                            {item.subTitle}
                                        </Tag>
                                        <Tag color="green">
                                            {item.format}
                                        </Tag>
                                    </div>
                                    <div className="uppercase font-bold text-[#FFF] text-[18px]">
                                        <span className="hover:text-[var(--primary-limegreen)] cursor-pointer
                                                duration-[0.3s]">
                                            {item.movie}
                                        </span>
                                    </div>
                                    <p className="text-[15px] font-semibold mt-[5px]">
                                        <span className="text-[#CCCCCC]">Thể loại phim: </span>
                                        <span className="text-[#FFF]">{item.genre}</span>
                                    </p>
                                    <div className="mt-[15px]">
                                        <button onClick={() => {
                                            handleShowModalMovieDetail(item.id);
                                        }} className="h-[45px] rounded-md bg-transparent text-[#FFF]
                                                border border-[var(--primary-limegreen)] hover:bg-[var(--primary-limegreen)] duration-300 ease-in-out
                                                py-[5px] px-[15px]">
                                            <FontAwesomeIcon icon={faTicket} className="mr-[10px] text-[20px]" />
                                            <span className="font-semibold text-[17px]">Thông tin chi tiết</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}