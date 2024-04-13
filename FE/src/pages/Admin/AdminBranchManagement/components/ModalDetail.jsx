import { Divider, Modal, Typography } from "antd";
import { useEffect } from "react";

export const ModalDetail = ({ openModal, setOpenModal, dataDetail }) => {

    useEffect(() => {
        console.log(dataDetail);
    }, [dataDetail])

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>Chi Tiết Chi Nhánh</Typography.Title>}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <div className="border rounded-3 mb-[10px]">
                    <div style={{ padding: "15px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Mã Chi Nhánh</span>
                        <span>{dataDetail.code}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên Chi Nhánh</span>
                        <span>{dataDetail.name}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Email Chi Nhánh</span>
                        <span>{dataDetail.email}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Địa chỉ Chi Nhánh</span>
                        <span>{dataDetail.address}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>HostLine Chi Nhánh</span>
                        <span>{dataDetail.hostLine}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Khu Vực Chi Nhánh</span>
                        <span>{dataDetail.area}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Trạng Thái</span>
                        <span>{dataDetail.deleted ? "Đang hoạt động" : "Ngưng hoạt động"}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}