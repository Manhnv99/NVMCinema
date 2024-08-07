import { Table, Button, Tooltip, Tag, Pagination, Image } from "antd";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLayerGroup, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useStaff } from "../hooks/useStaff";
import { StaffContext } from "../store/context/context";
import { ModalStaffDetail } from "./ModalStaffDetail";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_ADD } from "../../../../app/BaseUrl/BaseUrl";
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken";

export const TableComponent = () => {

    //useNav
    const navigate = useNavigate();
    //useContext
    const [state, dispatch] = useContext(StaffContext);
    const areaId = ExtractInforToken().areaId;
    //custom Hook
    const { fetchListSearchStaff, fetchDeleteStaff, fetchDetailStaff } = useStaff();
    //openModal
    const [openModalStaffDetail, setOpenModalStaffDetail] = useState(false);
    //useRef
    const refTimeOutId = useRef(1);
    //state re-render
    const [firstRerender, setFirstRerender] = useState(false);

    //columns table
    const columns = [
        {
            title: "Ảnh đại diện", dataIndex: "imageUrl", key: "imageUrl",
            render: (imageUrl) => (
                <Image
                    width={150}
                    height={100}
                    src={imageUrl}
                    style={{
                        borderRadius: "5px",
                        objectFit: "cover"
                    }}
                />
            )
        },
        { title: "Mã Nhân Viên", dataIndex: "code", key: "code" },
        { title: "Tên Nhân Viên", dataIndex: "name", key: "name" },
        { title: "Căn Cước", dataIndex: "cccd", key: "cccd" },
        {
            title: "Giới Tính", dataIndex: "gender", key: "gender",
            render: (record) => record ? "Nam" : "Nữ"
        },
        { title: "Tuổi", dataIndex: "birthDay", key: "birthDay" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Số Điện Thoại", dataIndex: "phone", key: "phone" },
        { title: "Địa Chỉ", dataIndex: "address", key: "address" },
        { title: "Vai Trò", dataIndex: "role", key: "role" },
        { title: "Chi Nhánh", dataIndex: "branch", key: "branch" },
        {
            title: "Trạng Thái", dataIndex: "status", key: "status",
            render: (record) => record ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="red">Ngưng hoạt động</Tag>
        },
        {
            title: "Thao Tác", key: "action",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button onClick={() => {
                                navigate("/admin-area/management-staff/update/" + record.id);
                            }} style={{ backgroundColor: "#030405", color: "#fff" }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button onClick={() => {
                                fetchDetailStaff(record.id);
                                setOpenModalStaffDetail(true);
                            }}>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={record.status ? "Xóa nhân viên" : "Hoạt động lại"} color="red">
                            <Button onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn thay đổi trạng thái của nhân viên này ?",
                                    icon: "question",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        fetchDeleteStaff(record.id);
                                    }
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


    //useEffect run at first re-render
    useEffect(() => {
        fetchListSearchStaff(state.searchValue, areaId, 1);
    }, []);

    //useEffect for searching
    useEffect(() => {
        if (firstRerender) {
            //receive old timeout and clear it
            clearTimeout(refTimeOutId.current);
            //create a timeOutId
            let timeOutId = setTimeout(() => {
                fetchListSearchStaff(state.searchValue, areaId, 1);
            }, [500]);
            //save timeOutId
            refTimeOutId.current = timeOutId;
        } else {
            setFirstRerender(true);
        }
    }, [state.searchValue]);

    return (
        <>
            {<ModalStaffDetail openModal={openModalStaffDetail} setOpenModal={setOpenModalStaffDetail} />}
            <div className="mt-[50px]">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-[20px] ">
                        <FontAwesomeIcon icon={faLayerGroup} className="mr-[10px]" />
                        Danh sách nhân viên
                    </p>
                    <Button onClick={() => {
                        navigate(ROUTE_ADMIN_AREA_MANAGEMENT_STAFF_ADD)
                    }} type="primary" className="h-[40px]">Thêm Nhân Viên</Button>
                </div>
                <Table
                    className="mt-[10px]"
                    columns={columns}
                    scroll={{ x: "2000px" }}
                    dataSource={state.listStaff}
                    pagination={false}
                >
                </Table>
                <Pagination onChange={(page) => {
                    fetchListSearchStaff(state.searchValue, page);
                }} pageSize={DEFAUTL_PAGE_SIZE} total={state.totalElement} />
            </div>
        </>
    )
}