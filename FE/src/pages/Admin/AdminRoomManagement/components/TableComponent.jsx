import { Card, Button, Table, Pagination, Tooltip, Tag } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPenToSquare, faEye, faTrash, faPlus, faCouch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../store/context/context";
import { useRoom } from "../hooks/useRoom";
import { ModalAddOrUpdate } from "./ModalAddOrUpdate";
import { ModalDetail } from "./ModalDetail";
import { ModalChair } from "./ModalChair";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { setCurrentPageStore } from "../store/actions/RoomActions";

export const TableComponent = () => {

    //useContext
    const [state, dispatch] = useContext(RoomContext);
    //custom Hook
    const { handleFetchListSearchRoom, handleFetchDeleteBranch } = useRoom();
    //openModal
    const [openModalAddOrUpdate, setOpenModalAddOrUpdate] = useState(false);
    const [renderModalAddOrUpdate, setRenderModalAddOrUpdate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [renderModalDetail, setRenderModalDetail] = useState(false);
    const [openModalChair, setOpenModalChair] = useState(false);
    const [renderModalChair, setRenderModalChair] = useState(false);
    const [whatAction, setWhatAction] = useState("post");
    //state
    const [roomId, setRoomId] = useState("");

    const columns = [
        { title: "Mã Phòng Chiếu", dataIndex: "code", key: "code" },
        { title: "Tên Phòng Chiếu", dataIndex: "name", key: "name" },
        { title: "Chi Nhánh", dataIndex: "branch", key: "branch" },
        { title: "Khu Vực", dataIndex: "area", key: "area" },
        {
            title: "Trạng Thái", dataIndex: "deleted", key: "deleted",
            render: (deleted) => {
                if (deleted) {
                    return (
                        <Tag color="green">Đang hoạt động</Tag>
                    )
                } else {
                    return (
                        <Tag color="red">Ngưng hoạt động</Tag>
                    )
                }
            }
        },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button style={{ backgroundColor: "#030405", color: "#fff" }} onClick={() => {
                                setRoomId(record.id);
                                setRenderModalAddOrUpdate(!renderModalAddOrUpdate);
                                setWhatAction("put");
                                setOpenModalAddOrUpdate(true);
                            }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button onClick={() => {
                                setRoomId(record.id);
                                setRenderModalDetail(!renderModalDetail);
                                setOpenModalDetail(true);
                            }}>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={record.deleted ? "Xóa phòng chiếu" : "Hoạt động lại"} color="red">
                            <Button onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn thay đổi trạng thái của phòng chiếu này ?",
                                    icon: "question",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        handleFetchDeleteBranch(record.id);
                                    }
                                })
                            }} style={{ backgroundColor: "red", color: "#fff" }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Ghế ngồi" className="mx-[10px]">
                            <Button onClick={() => {
                                setOpenModalChair(true);
                                setRoomId(record.id);
                                setRenderModalChair(!renderModalChair)
                            }}>
                                <FontAwesomeIcon icon={faCouch} />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        },
    ];

    useEffect(() => {
        handleFetchListSearchRoom(
            state.inforSearch.inputSearch,
            state.inforSearch.branchId,
            1
        );
    }, [state.inforSearch, 1]);

    return (
        <>
            {<ModalChair openModal={openModalChair} setOpenModal={setOpenModalChair} render={renderModalChair} roomId={roomId} />}
            {<ModalDetail
                openModal={openModalDetail}
                setOpenModal={setOpenModalDetail}
                roomId={roomId}
                render={renderModalDetail}
            />}
            {<ModalAddOrUpdate
                openModal={openModalAddOrUpdate}
                setOpenModal={setOpenModalAddOrUpdate}
                whatAction={whatAction}
                id={roomId}
                key={"ModalAddOrUpdate"}
                render={renderModalAddOrUpdate}
            />}
            <div className="mt-[25px] shadow-xl">
                <Card
                    title={
                        <span className="text-[18px]">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-[23px] mr-[5px]" />
                            Danh sách phòng chiếu
                        </span>
                    }
                    extra={
                        <Button onClick={() => {
                            setWhatAction("post");
                            setOpenModalAddOrUpdate(true);
                        }} type="primary" className="h-[40px] text-[15px]">
                            <FontAwesomeIcon icon={faPlus} className="mr-[5px]" />
                            Thêm phòng chiếu
                        </Button>
                    }
                >
                    <Table
                        columns={columns}
                        dataSource={state.inforListRoom.listRoom}
                        scroll={{
                            x: "1200px"
                        }}
                        pagination={false}
                    >

                    </Table>
                    <Pagination onChange={(page) => {
                        handleFetchListSearchRoom(
                            state.inforSearch.inputSearch,
                            state.inforSearch.branchId,
                            page
                        );
                        dispatch(setCurrentPageStore(page));
                    }} pageSize={DEFAUTL_PAGE_SIZE} total={state.inforListRoom.totalElement} />
                </Card>
            </div>
        </>
    )
}