import { Modal, Row, Col } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useRoom } from "../hooks/useRoom";

export const ModalChair = ({ openModal, setOpenModal, render, roomId }) => {

    //custom hooks
    const { handleFetchListChair } = useRoom();
    //setList
    const [listChair, setListChair] = useState([]);

    useEffect(() => {
        if (roomId !== "") {
            handleFetchListChair(roomId).then(response => {
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
                {listChair.map((item, index) => {
                    return (
                        <>
                            {(index % 10 === 0) &&
                                <span className="relative cursor-pointer">
                                    <span className="absolute top-[-25px] left-[-25px] text-[18px]">{item.name.substring(0, 1)}</span>
                                </span>
                            }
                            <span className="relative cursor-pointer">
                                <span style={{
                                    top: "-70%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)"
                                }} className="absolute text-[#FFF] font-medium">{item.name}</span>
                                <FontAwesomeIcon icon={faCouch} className="text-[35px] mx-[13px] my-[10px]" />
                            </span>
                            {(index + 1) % 10 === 0 && <br />}
                        </>
                    )
                })}
            </div>
        </Modal>
    )
}