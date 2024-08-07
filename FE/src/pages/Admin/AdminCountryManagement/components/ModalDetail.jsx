import { Divider, Modal, Typography } from "antd";

export const ModalDetail = ({ openModal, setOpenModal, dataDetail }) => {

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>Chi Tiết Khu Vực</Typography.Title>}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <div className="border rounded-3 mb-[10px]">
                    <div style={{ padding: "15px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Mã Khu Vực</span>
                        <span>{dataDetail.code}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên Khu Vực</span>
                        <span>{dataDetail.name}</span>
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