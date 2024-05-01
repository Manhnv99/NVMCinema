import { Card, Button, Table, Pagination, Tooltip, Image, Tag } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPenToSquare, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { PromotionEventContext } from "../store/context/context";
import { ModalAddOrUpdate } from "./ModalAddOrUpdate";
import { usePromotionEvent } from "../hooks/usePromotionEvent";
import { ModalDetail } from "./ModalDetail";
import { DANG_DIEN_RA, SAP_DIEN_RA } from "../../../../app/Constant/PromotionEventConstant";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { setCurrentPageStore } from "../store/actions/PromotionEventActions";

export const TableComponent = () => {

    //custom hooks

    //useContext
    const [state, dispatch] = useContext(PromotionEventContext);
    //start Open Modal
    const [PEId, setPEId] = useState("");
    const [whatAction, setWhatAction] = useState("post");

    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [renderModalDetail, setRenderModalDetail] = useState(false);

    const [openModalAddOrUpdate, setOpenModalAddOrUpdate] = useState(false);
    const [renderModalAddOrUpdate, setRenderModalAddOrUpdate] = useState(false);
    //end Open Modal

    //custom hooks
    const {
        handleFetchListSearch
    } = usePromotionEvent();

    const columns = [
        {
            title: "Ảnh Sự Kiện", dataIndex: "imageUrl", key: "imageUrl",
            render: (imageUrl) => (
                <Image
                    className="rounded-[5px]"
                    width={200}
                    height={100}
                    style={{ objectFit: "cover" }}
                    src={imageUrl}
                />
            )
        },
        { title: "Mã Sự Kiện", dataIndex: "code", key: "code" },
        { title: "Tên Sự Kiện", dataIndex: "name", key: "name" },
        { title: "Thời Gian Bắt Đầu", dataIndex: "dateStart", key: "dateStart" },
        { title: "Thời Gian Kết Thúc", dataIndex: "dateEnd", key: "dateEnd" },
        {
            title: "Mã Khuyến Mãi", dataIndex: "promotionCode", key: "promotionCode",
            render: (promotionCode) => <Tag color="green" children={promotionCode} />
        },
        { title: "Giá Khuyến Mãi", dataIndex: "promotionPrice", key: "promotionPrice" },
        {
            title: "Trạng Thái", dataIndex: "status", key: "status",
            render: (status) => {
                if (status === DANG_DIEN_RA) {
                    return (
                        <Tag color="green">Đang Diễn Ra</Tag>
                    )
                } else if (status === SAP_DIEN_RA) {
                    return (
                        <Tag color="gold">Sắp Diễn Da</Tag>
                    )
                } else {
                    return (
                        <Tag color="red">Đã Hết Hạn</Tag>
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
                            <Button onClick={() => {
                                setPEId(record.id);
                                setWhatAction("put");
                                setRenderModalAddOrUpdate(!renderModalAddOrUpdate);
                                setOpenModalAddOrUpdate(true);
                            }} style={{ backgroundColor: "#030405", color: "#fff" }} >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button onClick={() => {
                                setPEId(record.id);
                                setOpenModalDetail(true);
                                setRenderModalDetail(!renderModalDetail);
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
        handleFetchListSearch(
            state.inforSearch.name,
            state.inforSearch.timeStart,
            state.inforSearch.timeEnd,
            1
        );
    }, [state.inforSearch]);

    return (
        <>
            {<ModalDetail
                PEId={PEId}
                openModal={openModalDetail}
                setOpenModal={setOpenModalDetail}
                render={renderModalDetail}
                key={"ModalDetail"}
            />}
            {<ModalAddOrUpdate
                PEId={PEId}
                openModal={openModalAddOrUpdate}
                setOpenModal={setOpenModalAddOrUpdate}
                render={renderModalAddOrUpdate}
                whatAction={whatAction}
                key={"ModalAddOrUpdate"}
            />}
            <div className="mt-[25px] shadow-xl">
                <Card
                    title={
                        <span className="text-[18px]">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-[23px] mr-[5px]" />
                            Danh Sự Kiện
                        </span>
                    }
                    extra={
                        <Button onClick={() => {
                            setWhatAction("post");
                            setOpenModalAddOrUpdate(true);
                        }} type="primary" className="h-[40px] text-[15px]">
                            <FontAwesomeIcon icon={faPlus} className="mr-[5px]" />
                            Thêm Sự Kiện
                        </Button>
                    }
                >
                    <Table
                        columns={columns}
                        dataSource={state.inforList.listPE}
                        pagination={false}
                        scroll={{
                            x: 1600
                        }}
                    >

                    </Table>
                    <Pagination onChange={(page) => {
                        handleFetchListSearch(
                            state.inforSearch.name,
                            state.inforSearch.timeStart,
                            state.inforSearch.timeEnd,
                            page
                        );
                        dispatch(setCurrentPageStore(page));
                    }} pageSize={DEFAUTL_PAGE_SIZE} total={state.inforList.totalElement} />
                </Card>
            </div>
        </>
    )
}