import { Divider, Modal, Typography } from "antd"

export const ModalDetailComponent = ({ openModal, setOpenModal, dataDetail }) => {

    return (
        <Modal
            title={<Typography.Title level={3}>Thông tin chi nhánh</Typography.Title>}
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}>
            <div className="border rounded-3 mb-[10px]">
                <div style={{ padding: "15px 10px 0 10px" }} className="flex justify-between">
                    <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên chi nhánh</span>
                    <span>{dataDetail.name}</span>
                </div>
                <Divider style={{ margin: "10px 0" }}></Divider>
                {/**/}
                <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                    <span className="w-[30%]" style={{ fontSize: "15px", fontWeight: 600 }}>Địa chỉ</span>
                    <span>{dataDetail.address}</span>
                </div>
                <Divider style={{ margin: "10px 0" }}></Divider>
                {/**/}
                <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                    <span style={{ fontSize: "15px", fontWeight: 600 }}>HostLine</span>
                    <span>{dataDetail.hostLine}</span>
                </div>
                <Divider style={{ margin: "10px 0" }}></Divider>
                {/**/}
                <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                    <span style={{ fontSize: "15px", fontWeight: 600 }}>Email</span>
                    <span>{dataDetail.email}</span>
                </div>
                <Divider style={{ margin: "10px 0" }}></Divider>
                {/**/}
                <div className="flex justify-between p-[10px]">
                    <span style={{ fontSize: "15px", fontWeight: 600 }}>Phòng chiếu</span>
                    <span>{dataDetail.totalRoom}</span>
                </div>
            </div>
        </Modal>
    )

}