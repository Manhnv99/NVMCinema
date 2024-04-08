import { Divider, Modal, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { DirectorManagementAPI } from "../../../../apis/Admin/Directormanagement/DirectorManagementAPI";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";

export const ModalDetail = ({ openModal, setOpenModal, directorId }) => {

    const dispatch = useDispatch();
    const [detailDirector, setDetailDirector] = useState({});

    useEffect(() => {
        if (directorId !== undefined) {
            handleFetchDetail(directorId)
        }
    }, [directorId]);

    //handleGetDetail
    const handleFetchDetail = async (directorId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchDetailDirector(directorId);
            dispatch(setLoadingFalse());
            setDetailDirector(response.data.data);
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>Chi Tiết Nhân Viên</Typography.Title>}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <div className="border rounded-3 mb-[10px]">
                    <div style={{ padding: "15px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Mã Đạo Diễn</span>
                        <span>{detailDirector.code}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tên Đạo Diễn</span>
                        <span>{detailDirector.name}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Tuổi</span>
                        <span>{detailDirector.age}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Giới Tính</span>
                        <span>{detailDirector.gender ? "Nam" : "Nữ"}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Mô Tả</span>
                        <span>{detailDirector.description}</span>
                    </div>
                    <Divider style={{ margin: "10px 0" }}></Divider>
                    {/**/}
                    <div style={{ padding: "10px 10px 0 10px" }} className="flex justify-between">
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>Trạng Thái</span>
                        <span>{detailDirector.deleted ? "Đang hoạt động" : "Ngưng hoạt động"}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}