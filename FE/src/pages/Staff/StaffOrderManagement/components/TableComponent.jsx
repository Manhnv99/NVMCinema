import { faBan, faCheck, faEye, faLayerGroup, faPenToSquare, faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Image, Pagination, Radio, Table, Tag, Tooltip } from "antd"
import Swal from "sweetalert2";
import { CHUA_DUYET_CONSTANT, DA_DUYET_CONSTANT, DA_HUY_CONSTANT } from "../../../../app/Constant/OrderStatusConstant";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../store/context/context";
import { setOrderStatusAction } from "../store/actions/OrderActions";
import { useOrderManagement } from "../hooks/useOrderManagement";
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import dayjs from "dayjs";
import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";
import { render } from "react-dom";


export const TableComponent = () => {

    //constant
    const CANCEL_ORDER = "CANCEL_ORDER";
    const APPROVED_ORDER = "APPROVED_ORDER";
    const RESTORE_ORDER = "RESTORE_ORDER";
    //useContext
    const [state, dispatch] = useContext(OrderContext);
    //custom hooks
    const {
        handleFetchListSearchOrder,
        handleFetchApprovedOrCancelOrRestore, isApprovedOrCancelOrRestoreSuccess
    } = useOrderManagement();
    //page
    const [currentPage, setCurrentPage] = useState(1);
    //userToken
    const [userToken, setUserToken] = useState({});

    //columns
    const columnsNotApproval = [
        {
            title: "Ảnh", dataIndex: "movieImage", key: "movieImage",
            render: (movieImage) => (
                <Image
                    className="rounded-[5px]"
                    width={200}
                    height={100}
                    style={{ objectFit: "cover" }}
                    src={movieImage}
                />
            )
        },
        { title: "Mã Vé", dataIndex: "orderCode", key: "orderCode" },
        { title: "Hình Thức", dataIndex: "onlineOrOffline", key: "onlineOrOffline" },
        { title: "Mã Thành Viên", dataIndex: "clientCode", key: "clientCode" },
        { title: "Họ Tên", dataIndex: "clientName", key: "clientName" },
        { title: "Tên Phim", dataIndex: "movie", key: "movie" },
        {
            title: "Giờ Chiếu", dataIndex: "showTime", key: "showTime",
            render: (showTime) => {
                const arrShowTime = showTime.split(" ");
                return arrShowTime[0] + " | " + dayjs(arrShowTime[1], "HH:mm:ss").format("HH:mm");
            }
        },
        { title: "Ghế", dataIndex: "chair", key: "chair" },
        {
            title: "Đồ Ăn", dataIndex: "food", key: "food",
            render: (food) => food === null ? "Không có" : food
        },
        {
            title: "Giảm giá", dataIndex: "promotion", key: "promotion",
            render: (promotion) => promotion === null ? "Không có" : ConvertCurrencyVND(promotion)
        },
        {
            title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice",
            render: (totalPrice) => ConvertCurrencyVND(totalPrice)
        },
        {
            title: "Trạng thái", dataIndex: "orderStatus", key: "orderStatus",
            render: (orderStatus) => <Tag color="yellow" children={"Chờ xác nhận"} />
        },
        {
            title: "Thao Tác", key: "action",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Nhận Vé" color="green" className="mr-[10px]">
                            <Button onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn duyệt hóa đơn này ?",
                                    icon: "question",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        handleFetchApprovedOrCancelOrRestore(userToken.userId, record.orderId, APPROVED_ORDER);
                                    }
                                })
                            }} style={{ backgroundColor: "green", color: "#fff" }}>
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Hủy Vé" color="red">
                            <Button onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn hủy hóa đơn này ?",
                                    icon: "question",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        handleFetchApprovedOrCancelOrRestore(userToken.userId, record.orderId, CANCEL_ORDER);
                                    }
                                })
                            }} style={{ backgroundColor: "red", color: "#fff" }}>
                                <FontAwesomeIcon icon={faBan} />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        },
    ];
    const columnsApproved = [
        {
            title: "Ảnh", dataIndex: "movieImage", key: "movieImage",
            render: (movieImage) => (
                <Image
                    className="rounded-[5px]"
                    width={200}
                    height={100}
                    style={{ objectFit: "cover" }}
                    src={movieImage}
                />
            )
        },
        { title: "Mã Vé", dataIndex: "orderCode", key: "orderCode" },
        {
            title: "Hình Thức", dataIndex: "onlineOrOffline", key: "onlineOrOffline",
            render: (onlineOrOffline) => <Tag color={onlineOrOffline === "ONLINE" ? "green" : "blue"} children={onlineOrOffline} />
        },
        {
            title: "Nhân Viên", dataIndex: "userCode", key: "userCode",
            render: (userCode) => userCode === null ? "Không có" : userCode
        },
        {
            title: "Mã Thành Viên", dataIndex: "clientCode", key: "clientCode",
            render: (clientCode) => clientCode === null ? "Không có" : clientCode
        },
        {
            title: "Họ Tên", dataIndex: "clientName", key: "clientName",
            render: (clientName) => clientName === null ? "Không có" : clientName
        },
        { title: "Tên Phim", dataIndex: "movie", key: "movie" },
        {
            title: "Giờ Chiếu", dataIndex: "showTime", key: "showTime",
            render: (showTime) => {
                const arrShowTime = showTime.split(" ");
                return arrShowTime[0] + " | " + dayjs(arrShowTime[1], "HH:mm:ss").format("HH:mm");
            }
        },
        { title: "Ghế", dataIndex: "chair", key: "chair" },
        {
            title: "Đồ Ăn", dataIndex: "food", key: "food",
            render: (food) => food === null ? "Không có" : food
        },
        {
            title: "Giảm giá", dataIndex: "promotion", key: "promotion",
            render: (promotion) => promotion === null ? "Không có" : ConvertCurrencyVND(promotion)
        },
        {
            title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice",
            render: (totalPrice) => ConvertCurrencyVND(totalPrice)
        },
        {
            title: "Trạng thái", dataIndex: "orderStatus", key: "orderStatus",
            render: (orderStatus) => <Tag color="green" children={"Đã xác nhận"} />
        },
    ];
    const columnsCanceled = [
        {
            title: "Ảnh", dataIndex: "movieImage", key: "movieImage",
            render: (movieImage) => (
                <Image
                    className="rounded-[5px]"
                    width={200}
                    height={100}
                    style={{ objectFit: "cover" }}
                    src={movieImage}
                />
            )
        },
        { title: "Mã Vé", dataIndex: "orderCode", key: "orderCode" },
        {
            title: "Hình Thức", dataIndex: "onlineOrOffline", key: "onlineOrOffline",
            render: (onlineOrOffline) => <Tag color={onlineOrOffline === "ONLINE" ? "green" : "blue"} children={onlineOrOffline} />
        },
        {
            title: "Nhân Viên", dataIndex: "userCode", key: "userCode",
            render: (userCode) => userCode === null ? "Không có" : userCode
        },
        { title: "Mã Thành Viên", dataIndex: "clientCode", key: "clientCode" },
        { title: "Họ Tên", dataIndex: "clientName", key: "clientName" },
        { title: "Tên Phim", dataIndex: "movie", key: "movie" },
        {
            title: "Giờ Chiếu", dataIndex: "showTime", key: "showTime",
            render: (showTime) => {
                const arrShowTime = showTime.split(" ");
                return arrShowTime[0] + " | " + dayjs(arrShowTime[1], "HH:mm:ss").format("HH:mm");
            }
        },
        { title: "Ghế", dataIndex: "chair", key: "chair" },
        {
            title: "Đồ Ăn", dataIndex: "food", key: "food",
            render: (food) => food === null ? "Không có" : food
        },
        {
            title: "Giảm giá", dataIndex: "promotion", key: "promotion",
            render: (promotion) => promotion === null ? "Không có" : ConvertCurrencyVND(promotion)
        },
        {
            title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice",
            render: (totalPrice) => ConvertCurrencyVND(totalPrice)
        },
        {
            title: "Trạng thái", dataIndex: "orderStatus", key: "orderStatus",
            render: (orderStatus) => <Tag color="red" children={"Đã hủy"} />
        },
        {
            title: "Thao Tác", key: "action",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Khôi phục" color="#1E90FF " className="mr-[10px]">
                            <Button onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn khôi phục hóa đơn này ?",
                                    icon: "question",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        handleFetchApprovedOrCancelOrRestore(userToken.userId, record.orderId, RESTORE_ORDER);
                                    }
                                })
                            }} style={{ backgroundColor: "#1E90FF ", color: "#FFF" }}>
                                <FontAwesomeIcon icon={faRepeat} />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        },
    ];
    //fetch List Order
    useEffect(() => {
        const inforToken = ExtractInforToken();
        setUserToken(inforToken);
        handleFetchListSearchOrder(
            state.inforSearch.orderCode,
            state.inforSearch.date,
            state.inforSearch.timeStart,
            inforToken.branchId,
            state.orderStatus,
            currentPage
        );
    }, [state.inforSearch, currentPage, state.orderStatus, isApprovedOrCancelOrRestoreSuccess]);

    return (
        <>
            <div className="mt-[50px] shadow-xl">
                <Card
                    title={
                        <span className="font-bold text-[20px]">
                            <FontAwesomeIcon icon={faLayerGroup} className="mr-[10px]" />
                            Danh sách hóa đơn
                        </span>
                    }
                    extra={
                        <Radio.Group onChange={(e) => dispatch(setOrderStatusAction(e.target.value))} value={state.orderStatus}>
                            <Radio value={DA_DUYET_CONSTANT}>Đã duyệt</Radio>
                            <Radio value={CHUA_DUYET_CONSTANT}>Chưa duyệt</Radio>
                            <Radio value={DA_HUY_CONSTANT}>Đã hủy</Radio>
                        </Radio.Group>
                    }
                >
                    <Table
                        columns={
                            state.orderStatus === CHUA_DUYET_CONSTANT
                                ?
                                columnsNotApproval
                                :
                                state.orderStatus === DA_DUYET_CONSTANT
                                    ?
                                    columnsApproved
                                    :
                                    columnsCanceled
                        }
                        pagination={false}
                        dataSource={state.inforListOrder.listOrder}
                        scroll={{
                            x: "2100px"
                        }}
                    />
                    <Pagination
                        pageSize={DEFAUTL_PAGE_SIZE}
                        total={state.inforListOrder.totalElement}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </Card>
            </div>
        </>
    )
}