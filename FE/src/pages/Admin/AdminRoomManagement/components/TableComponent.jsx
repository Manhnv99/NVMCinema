import { Card, Button, Table, Pagination, Tooltip, Image, Tag } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPenToSquare, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../store/context/context";
import { useRoom } from "../hooks/useRoom";

export const TableComponent = () => {

    //useContext
    const [state, dispatch] = useContext(RoomContext);
    //custom Hook
    const { handleFetchListSearchRoom } = useRoom();
    //page
    const [currentPage, setCurrentPage] = useState(1);

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
                            <Button style={{ backgroundColor: "#030405", color: "#fff" }} >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button>
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
                                    // if (result.isConfirmed) {

                                    // }
                                })
                            }} style={{ backgroundColor: "red", color: "#fff" }}>
                                <FontAwesomeIcon icon={faTrash} />
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
            currentPage
        );
    }, [state.inforSearch, currentPage]);

    return (
        <>
            <div className="mt-[25px] shadow-xl">
                <Card
                    title={
                        <span className="text-[18px]">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-[23px] mr-[5px]" />
                            Danh sách phòng chiếu
                        </span>
                    }
                    extra={
                        <Button type="primary" className="h-[40px] text-[15px]">
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
                        setCurrentPage(page)
                    }} total={state.inforListRoom.totalElement} />
                </Card>
            </div>
        </>
    )
}