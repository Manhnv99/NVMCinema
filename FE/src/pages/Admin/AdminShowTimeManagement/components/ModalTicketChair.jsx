import { Modal } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useShowTime } from "../hooks/useShowTime";
import seatScreenImage from "../../../../assets/seatScreen.png"

export const ModalTicketChair = ({ openModal, setOpenModal, render, showTimeId }) => {

    //setList
    const [listChair, setListChair] = useState([]);
    //custom Hooks
    const {
        handleFetchListTicketChair
    } = useShowTime();

    useEffect(() => {
        if (showTimeId !== "") {
            handleFetchListTicketChair(showTimeId).then(response => {
                console.log(response);
                setListChair(response.data.data);
            })
        }
    }, [render]);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <Modal
            title={<span className="text-[20px] font-bold">Chi Tiết Ghế</span>}
            open={openModal}
            onCancel={handleCloseModal}
            footer={false}
            style={{
                minWidth: "850px"
            }}
        >
            <div className="text-center">
                <div className="mb-[20px]">
                    <img src={seatScreenImage} />
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
                                        <span style={{
                                            top: "-70%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)"
                                        }} className="absolute text-[#FFF] font-medium">{item.name}</span>
                                        <FontAwesomeIcon icon={faCouch} className="text-[35px] mx-[13px] my-[10px] text-[red]" />
                                    </>
                                    :
                                    <>
                                        <span style={{
                                            top: "-70%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)"
                                        }} className="absolute text-[#FFF] font-medium">{item.name}</span>
                                        <FontAwesomeIcon icon={faCouch} className="text-[35px] mx-[13px] my-[10px]" />
                                    </>
                                }
                            </span>
                            {(index + 1) % 10 === 0 && <br />}
                        </>
                    )
                })}
                <div className="mt-[20px] flex justify-center items-center">
                    <div className="flex justify-center items-center mr-[20px]">
                        <FontAwesomeIcon icon={faCouch} className="text-[35px]" />
                        <span className="font-semibold text-[16px] ml-[5px] text-[#222]">Ghế chưa bán</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <FontAwesomeIcon icon={faCouch} className="text-[35px] text-[red]" />
                        <span className="font-semibold text-[16px] ml-[5px] text-[#222]">Ghế đã bán</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}