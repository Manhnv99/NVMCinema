import { Card, Button, Table, Pagination, Tooltip, Image, Tag } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPenToSquare, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { ShowTimeContext } from "../store/context/context";
import { useShowTime } from "../hooks/useShowTime";
import { ModalAddOrUpdate } from "./ModalAddOrUpdate";
import { ModalDetail } from "./ModalDetail";


export const TableComponent = () => {
    //custom hooks

    //useContext
    const [state, dispatch] = useContext(ShowTimeContext);
    //use state
    const [currentPage, setCurrentPage] = useState(1);
    const [showTimeId, setShowTimeId] = useState("");
    //open Modal
    const [whatAction, setWhatAction] = useState("post");
    const [openModalAddOrUpdate, setOpenModalAddOrUpdate] = useState(false);
    const [renderModalAddOrUpdate, setRenderModalAddOrUpdate] = useState(false);

    const [openModalDetail, setOpenModaDetail] = useState(true);
    const [renderModalDetail, setRenderModalDetail] = useState(false);
    //custom hooks
    const { handleFetchListSearchShowTime } = useShowTime();

    const columns = [
        { title: "Tên Phim", dataIndex: "movie", key: "movie" },
        { title: "Phòng Chiếu", dataIndex: "room", key: "room" },
        { title: "Chi Nhánh", dataIndex: "branch", key: "branch" },
        { title: "Khu Vực", dataIndex: "area", key: "area" },
        { title: "Ngày Chiếu", dataIndex: "screeningDate", key: "screeningDate" },
        { title: "Giờ Chiếu", dataIndex: "timeStart", key: "timeStart" },
        { title: "Giá Vé", dataIndex: "ticketPrice", key: "ticketPrice" },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button style={{ backgroundColor: "#030405", color: "#fff" }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button onClick={() => {
                                setShowTimeId(record.id);
                            }}>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        },
    ];


    useEffect(() => {
        handleFetchListSearchShowTime(
            state.inforSearch.movieName,
            state.inforSearch.areaId,
            state.inforSearch.branchId,
            state.inforSearch.roomId,
            currentPage
        );
    }, [state.inforSearch, currentPage]);

    return (
        <>
            {<ModalDetail
                openModal={openModalDetail}
                setOpenModal={setOpenModaDetail}
                render={renderModalDetail}
                showTimeId={showTimeId}
                key={"ModalDetail"}
            />}
            {<ModalAddOrUpdate
                openModal={openModalAddOrUpdate}
                setOpenModal={setOpenModalAddOrUpdate}
                render={renderModalAddOrUpdate}
                whatAction={whatAction}
                id={showTimeId}
                key={"ModalAddOrUpdate"}
            />}
            <div className="mt-[25px] shadow-xl">
                <Card
                    title={
                        <span className="text-[18px]">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-[23px] mr-[5px]" />
                            Danh xuất chiếu
                        </span>
                    }
                    extra={
                        <Button onClick={() => {
                            setOpenModalAddOrUpdate(true);
                        }} type="primary" className="h-[40px] text-[15px]">
                            <FontAwesomeIcon icon={faPlus} className="mr-[5px]" />
                            Thêm xuất chiếu
                        </Button>
                    }
                >
                    <Table
                        columns={columns}
                        dataSource={state.inforListShowTime.listShowTime}
                        scroll={{
                            x: "1800px"
                        }}
                        pagination={false}
                    >

                    </Table>
                    <Pagination onChange={(page) => {
                        setCurrentPage(page)
                    }} total={state.inforListShowTime.totalElement} />
                </Card>
            </div>
        </>
    )
}