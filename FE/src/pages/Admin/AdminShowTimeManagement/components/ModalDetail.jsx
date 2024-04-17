import { Divider, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { useShowTime } from "../hooks/useShowTime";
import dayjs from "dayjs";

export const ModalDetail = ({ openModal, setOpenModal, showTimeId, render }) => {

    //state
    const [detailShowTime, setDetailShowTime] = useState({});
    //custom hooks
    const {
        handleFetchGetDetailShowTime
    } = useShowTime();

    useEffect(() => {
        console.log(showTimeId);
        if (showTimeId !== "") {
            handleFetchGetDetailShowTime(showTimeId).then(response => {
                setDetailShowTime(response.data.data);
            });
        }
    }, [render]);

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>Chi Tiết Xuất Chiếu</Typography.Title>}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <div className="border rounded-3 mb-[10px]">
                    <div style={{ padding: "15px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên Phim</span>
                        <span>{detailShowTime.movie}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên Phòng Chiếu</span>
                        <span>{detailShowTime.room}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Chi Nhánh</span>
                        <span>{detailShowTime.branch}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Khu Vực</span>
                        <span>{detailShowTime.area}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Ngày Chiếu</span>
                        <span>{detailShowTime.screeningDate}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Giờ Chiếu</span>
                        <span>{dayjs(detailShowTime.timeStart, "HH:mm:ss").format("HH:mm")}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Giá vé</span>
                        <span>{detailShowTime.ticketPrice}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Số lượng đã mua</span>
                        <span>{detailShowTime.ticketBooked}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 10px 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Số lượng còn</span>
                        <span>{detailShowTime.ticketNotBooked}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}