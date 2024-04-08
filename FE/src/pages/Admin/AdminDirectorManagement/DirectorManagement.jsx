import { Input, Table, Pagination, Button, Tag, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLayerGroup, faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalAddOrUpdate } from "./components/ModalAddOrUpdate";
import { useEffect, useRef, useState } from "react";
import { DEFAUTL_PAGE_SIZE } from "../../../app/Constant/PaginationConstant";
import { ModalDetail } from "./components/ModalDetail";
import { useDirector } from "./hooks/useDirector";

export const DirectorManagement = () => {

    //openModal
    const [openModalAddOrUpdate, setOpenModalAddOrUpdate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    //searchValue
    const [searchValue, setSearchValue] = useState("");
    //directorId
    const [directorId, setDirectorId] = useState(undefined);
    const [detailDirectorId, setDetailDirectorId] = useState(undefined);
    //what Action
    const [whatAction, setWhatAction] = useState("post");

    //custom Hooks
    const { fetchDeleteDirector,
        fetchListSearchDirector, listDirector, totalElement } = useDirector();
    //useRef
    const timeOutId = useRef();

    //columns table
    const columns = [
        { title: "Mã Đạo Diễn", dataIndex: "code", key: "code" },
        { title: "Tên Đạo Diễn", dataIndex: "name", key: "name" },
        { title: "Tuổi", dataIndex: "age", key: "age" },
        {
            title: "Giới Tính", dataIndex: "gender", key: "gender",
            render: (record) => record ? "Nam" : "Nữ"
        },
        { title: "Mô tả", dataIndex: "description", key: "description" },
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
                                setDirectorId(record.id);
                                setWhatAction("put");
                                setOpenModalAddOrUpdate(true);
                            }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]" onClick={() => {
                            setDetailDirectorId(record.id);
                            setOpenModalDetail(true);
                        }}>
                            <Button>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={record.status ? "Xóa nhân viên" : "Hoạt động lại"} color="red">
                            <Button style={{ backgroundColor: "red", color: "#fff" }} onClick={() => fetchDeleteDirector(record.id)}>
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
        fetchListSearchDirector(searchValue, 1);
    }, []);

    //handleChangeSearchValue
    const handleSearchList = (e) => {
        clearTimeout(timeOutId.current);
        setSearchValue(e.target.value);
        timeOutId.current = setTimeout(() => {
            fetchListSearchDirector(e.target.value, 1);
        }, [500]);
    }

    return (
        <>
            {<ModalDetail openModal={openModalDetail} setOpenModal={setOpenModalDetail} directorId={detailDirectorId} />}
            {<ModalAddOrUpdate openModal={openModalAddOrUpdate} setOpenModal={setOpenModalAddOrUpdate} directorId={directorId} whatAction={whatAction} setWhatAction={setWhatAction} />}
            <div className="container max-w-[1200px] mx-auto">
                <div className="shadow-xl rounded-[5px] px-[20px] py-[20px]">
                    <p className="font-bold font-sans text-2xl mb-[10px]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[10px]" />
                        Tìm kiếm đạo diễn
                    </p>
                    <Input
                        className="h-[50px]"
                        type="text"
                        placeholder="Tìm kiếm dạo diễn..."
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
                        Danh sách đạo diễn
                    </p>
                    <Button onClick={() => {
                        setOpenModalAddOrUpdate(true);
                        setWhatAction("post");
                    }} type="primary" className="h-[40px]">Thêm Đạo Diễn</Button>
                </div>
                <Table
                    className="mt-[10px]"
                    columns={columns}
                    scroll={{ x: "1300px" }}
                    dataSource={listDirector}
                    pagination={false}
                >
                </Table>
                <Pagination onChange={(page) => {
                    fetchListSearchDirector(searchValue, page);
                }}
                    pageSize={DEFAUTL_PAGE_SIZE}
                    total={totalElement}
                />
            </div>
        </>
    )
}