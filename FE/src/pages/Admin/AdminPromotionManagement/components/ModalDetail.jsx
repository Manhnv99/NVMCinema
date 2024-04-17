import { Col, Image, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import { usePromotionEvent } from "../hooks/usePromotionEvent";
import { FacebookOutlined, TwitterOutlined, PinterestOutlined, LinkedinOutlined } from '@ant-design/icons';

export const ModalDetail = ({ openModal, setOpenModal, PEId, render }) => {

    //state
    const [PEDetail, setPEDetail] = useState({});
    //custom Hook
    const {
        handleFetchDetail
    } = usePromotionEvent();

    useEffect(() => {
        if (PEId !== "") {
            handleFetchDetail(PEId).then(response => {
                console.log(response.data);
                setPEDetail(response.data.data);
            });
        }
    }, [render]);

    return (
        <Modal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            className="rounded-[10px]"
            width={1100}
            footer={false}
            closeIcon={false}
        >
            <Row gutter={20} className="p-[20px]">
                <Col span={8}>
                    <Image className="w-full rounded-[5px]" src={PEDetail.imageUrl} />
                    <div className="text-center text-[25px] text-[#FFF]">
                        <FacebookOutlined className="bg-[#1877f2] p-[3px] rounded-[5px] mr-[10px] cursor-pointer" />
                        <TwitterOutlined className="bg-[#1DA1F2] p-[3px] rounded-[5px] mr-[10px] cursor-pointer" />
                        <PinterestOutlined className="bg-[#be0216] p-[3px] rounded-[5px] mr-[10px] cursor-pointer" />
                        <LinkedinOutlined className="bg-[#006394] p-[3px] rounded-[5px] cursor-pointer" />
                    </div>
                </Col>
                <Col span={16}>
                    <p className="font-bold text-[25px]">{PEDetail.name}</p>
                    <p className="font-semibold text-[18px] mt-[5px]">Diễn ra từ: {PEDetail.dateStart} - {PEDetail.dateEnd}</p>
                    <p className="font-semibold text-[15px] mt-[5px]">Tại Cụm Rạp: NVM Cinema</p>
                    <p className="font-semibold text-[15px] mt-[5px]">{PEDetail.description}</p>
                </Col>
            </Row>
        </Modal>
    )
}