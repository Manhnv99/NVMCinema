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
        handleFetchListChair(roomId).then(response => {

        })
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
        >

        </Modal>
    )
}