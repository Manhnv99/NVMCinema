import { Input, Table, Pagination, Button, Tag, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLayerGroup, faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalAddOrUpdate } from "./components/ModalAddOrUpdate";
import { useEffect, useRef, useState } from "react";
import { DEFAUTL_PAGE_SIZE } from "../../../app/Constant/PaginationConstant";
import { ModalDetail } from "./components/ModalDetail";
import Swal from "sweetalert2";
import { useFormat } from "./hooks/useFormat";

export const FormatManagement = () => {

    //openModal
    const [openModalAddOrUpdate, setOpenModalAddOrUpdate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    //searchValue
    const [searchValue, setSearchValue] = useState("");
    //what Action
    const [whatAction, setWhatAction] = useState("post");

    //custom Hooks
    const {
        handleFetchDelete,
        handleFetchPut,
        handleFetchPost,
        handleFetchListSearch, listData, totalElement,
        handleFetchDetail, dataDetail, render
    } = useFormat();
    //useRef
    const timeOutId = useRef();

    //columns table
    const columns = [
        { title: "Mã Phân Giải", dataIndex: "code", key: "code" },
        { title: "Tên Phân Giải", dataIndex: "name", key: "name" },
        {
            title: "Trạng Thái", dataIndex: "deleted", key: "deleted",
            render: (record) => record ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="red">Ngưng hoạt động</Tag>
        },
        {
            title: "Thao Tác", key: "action",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button style={{ backgroundColor: "#030405", color: "#fff" }} onClick={() => {
                                handleFetchDetail(record.id);
                                setWhatAction("put");
                                setOpenModalAddOrUpdate(true);
                            }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]" onClick={() => {
                            handleFetchDetail(record.id);
                            setOpenModalDetail(true);
                        }}>
                            <Button>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={record.status ? "Xóa phân giải" : "Hoạt động lại"} color="red">
                            <Button style={{ backgroundColor: "red", color: "#fff" }} onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn thay đổi trạng thái của phân giải này?",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        handleFetchDelete(record.id);
                                    }
                                })
                            }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        },
    ];

    //useEffect
    useEffect(() => {
        handleFetchListSearch(searchValue, 1);
    }, []);

    //handleChangeSearchValue
    const handleSearchList = (e) => {
        clearTimeout(timeOutId.current);
        setSearchValue(e.target.value);
        timeOutId.current = setTimeout(() => {
            handleFetchListSearch(e.target.value, 1);
        }, [500]);
    }

    return (
        <>
            {<ModalDetail
                openModal={openModalDetail}
                setOpenModal={setOpenModalDetail}
                dataDetail={dataDetail}
            />}
            {<ModalAddOrUpdate
                openModal={openModalAddOrUpdate}
                setOpenModal={setOpenModalAddOrUpdate}
                dataDetail={dataDetail}
                render={render}
                whatAction={whatAction}
                handleFetchPut={handleFetchPut}
                handleFetchPost={handleFetchPost}
            />}
            <div className="container mx-auto">
                <div className="shadow-xl rounded-[5px] px-[20px] py-[20px]">
                    <p className="font-bold font-sans text-2xl mb-[10px]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[10px]" />
                        Tìm kiếm phân giải
                    </p>
                    <Input
                        className="h-[50px]"
                        type="text"
                        placeholder="Tìm kiếm phân giải theo mã, tên..."
                        value={searchValue}
                        onChange={handleSearchList}
                    >
                    </Input>
                </div>
            </div>
            <div className="mt-[50px]">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-[20px] ">
                        <FontAwesomeIcon icon={faLayerGroup} className="mr-[10px]" />
                        Danh sách phân giải
                    </p>
                    <Button onClick={() => {
                        setOpenModalAddOrUpdate(true);
                        setWhatAction("post");
                    }} type="primary" className="h-[40px]">Thêm phân giải</Button>
                </div>
                <Table
                    className="mt-[10px]"
                    columns={columns}
                    scroll={{ x: "1300px" }}
                    dataSource={listData}
                    pagination={false}
                >
                </Table>
                <Pagination onChange={(page) => {
                    handleFetchListSearch(searchValue, page);
                }}
                    pageSize={DEFAUTL_PAGE_SIZE}
                    total={totalElement}
                />
            </div>
        </>
    )
}