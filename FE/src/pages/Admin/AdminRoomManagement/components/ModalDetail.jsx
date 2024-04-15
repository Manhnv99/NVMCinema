import { Divider, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { useRoom } from "../hooks/useRoom";

export const ModalDetail = ({ openModal, setOpenModal, roomId, render }) => {

    //state
    const [detailRoom, setDetailRoom] = useState({});
    //custom Hooks
    const { handleFetchDetailRoom } = useRoom();

    useEffect(() => {
        handleFetchDetailRoom(roomId).then(response => {
            setDetailRoom(response.data.data);
        });
    }, [render]);

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>Chi Tiết Phòng Chiếu</Typography.Title>}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <div className="border rounded-3 mb-[10px]">
                    <div style={{ padding: "15px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Mã Phòng Chiếu</span>
                        <span>{detailRoom.code}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên Phòng Chiếu</span>
                        <span>{detailRoom.name}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Chi Nhánh</span>
                        <span>{detailRoom.branch}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Khu Vực</span>
                        <span>{detailRoom.area}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Số Lượng Ghế</span>
                        <span>{detailRoom.totalChair}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Trạng Thái</span>
                        <span>{detailRoom.deleted ? "Đang hoạt động" : "Ngưng hoạt động"}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}