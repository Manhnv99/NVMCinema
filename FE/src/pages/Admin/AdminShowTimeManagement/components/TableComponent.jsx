import { Card, Button, Table, Pagination, Tooltip, Image } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPenToSquare, faEye, faCouch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { ShowTimeContext } from "../store/context/context";
import { useShowTime } from "../hooks/useShowTime";
import { ModalAddOrUpdate } from "./ModalAddOrUpdate";
import { ModalDetail } from "./ModalDetail";
import dayjs from "dayjs";
import { ModalTicketChair } from "./ModalTicketChair";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { setCurrentPage } from "../store/actions/ShowTimeActions";


export const TableComponent = () => {
    //useContext
    const [state, dispatch] = useContext(ShowTimeContext);
    //use state
    const [showTimeId, setShowTimeId] = useState("");
    //open Modal
    const [whatAction, setWhatAction] = useState("post");
    const [openModalAddOrUpdate, setOpenModalAddOrUpdate] = useState(false);
    const [renderModalAddOrUpdate, setRenderModalAddOrUpdate] = useState(false);

    const [openModalDetail, setOpenModaDetail] = useState(false);
    const [renderModalDetail, setRenderModalDetail] = useState(false);

    const [openModalChair, setOpenModalChair] = useState(false);
    const [renderModalChair, setRenderModalChair] = useState(false);
    //custom hooks
    const { handleFetchListSearchShowTime } = useShowTime();

    const columns = [
        {
            title: "Banner", dataIndex: "banner", key: "banner",
            render: (banner) => (
                <Image
                    className="rounded-[5px]"
                    width={200}
                    height={100}
                    style={{ objectFit: "cover" }}
                    src={banner}
                />
            )
        },
        { title: "Tên Phim", dataIndex: "movie", key: "movie" },
        { title: "Phòng Chiếu", dataIndex: "room", key: "room" },
        { title: "Chi Nhánh", dataIndex: "branch", key: "branch" },
        { title: "Khu Vực", dataIndex: "area", key: "area" },
        { title: "Ngày Chiếu", dataIndex: "screeningDate", key: "screeningDate" },
        {
            title: "Giờ Chiếu", dataIndex: "timeStart", key: "timeStart",
            render: (timeStart) => dayjs(timeStart, "HH:mm:ss").format("HH:mm")
        },
        {
            title: "Giá Vé", dataIndex: "ticketPrice", key: "ticketPrice",
            render: (ticketPrice) => {
                return (
                    new Intl.NumberFormat().format(ticketPrice) + "VNĐ"
                )
            }
        },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Cập nhật">
                            <Button onClick={() => {
                                setWhatAction("put")
                                setShowTimeId(record.id);
                                setRenderModalAddOrUpdate(!renderModalAddOrUpdate);
                                setOpenModalAddOrUpdate(true);
                            }} style={{ backgroundColor: "#030405", color: "#fff" }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button onClick={() => {
                                setShowTimeId(record.id);
                                setOpenModaDetail(true)
                                setRenderModalDetail(!renderModalDetail);
                            }}>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Ghế ngồi">
                            <Button onClick={() => {
                                setOpenModalChair(true);
                                setShowTimeId(record.id);
                                setRenderModalChair(!renderModalChair)
                            }} className="text-[#FFF] bg-[#FFB6C1]">
                                <FontAwesomeIcon icon={faCouch} />
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
            1
        );
    }, [state.inforSearch]);

    return (
        <>
            {<ModalTicketChair
                openModal={openModalChair}
                setOpenModal={setOpenModalChair}
                render={renderModalChair}
                showTimeId={showTimeId}
                key={"ModalTicketChair"}
            />}
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
                showTimeId={showTimeId}
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
                            setWhatAction("post");
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
                            x: "1600px"
                        }}
                        pagination={false}
                    >

                    </Table>
                    <Pagination onChange={(page) => {
                        handleFetchListSearchShowTime(
                            state.inforSearch.movieName,
                            state.inforSearch.areaId,
                            state.inforSearch.branchId,
                            state.inforSearch.roomId,
                            page
                        );
                        dispatch(setCurrentPage(page));
                    }} pageSize={DEFAUTL_PAGE_SIZE} total={state.inforListShowTime.totalElement} />
                </Card>
            </div>
        </>
    )
}