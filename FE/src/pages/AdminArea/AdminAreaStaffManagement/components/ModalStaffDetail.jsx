import { Divider, Modal, Typography } from "antd";
import { useContext } from "react";
import { StaffContext } from "../store/context/context";

export const ModalStaffDetail = ({ openModal, setOpenModal }) => {

    const [state, dispatch] = useContext(StaffContext);

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>Chi Tiết Nhân Viên</Typography.Title>}
                open={openModal}
                style={{ marginTop: '-50px' }} // Tùy chỉnh khoảng cách từ top
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <div className="border rounded-3 max-h-[550px] overflow-y-scroll">
                    <div style={{ padding: "15px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Mã Nhân Viên</span>
                        <span>{state.detailStaff.code}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên Nhân Viên</span>
                        <span>{state.detailStaff.name}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Căn Cước Công Dân</span>
                        <span>{state.detailStaff.cccd}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Giới Tính</span>
                        <span>{state.detailStaff.gender ? "Nam" : "Nữ"}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Ngày Sinh</span>
                        <span>{state.detailStaff.birthDay}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Email</span>
                        <span>{state.detailStaff.email}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Số Điện Thoại</span>
                        <span>{state.detailStaff.phone}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Địa Chỉ</span>
                        <span>{state.detailStaff.address}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Vai Trò</span>
                        <span>{state.detailStaff.role}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 15px 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Chi nhánh</span>
                        <span>{state.detailStaff.branchName}</span>
                    </div>
                    {/**/}
                    <div style={{ padding: "10px 10px 15px 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Trạng Thái</span>
                        <span>{state.detailStaff.status ? "Đang hoạt động" : "Ngưng hoạt động"}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}