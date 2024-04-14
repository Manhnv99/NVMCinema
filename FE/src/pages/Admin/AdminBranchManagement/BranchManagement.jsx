import { Input, Table, Pagination, Button, Tag, Tooltip, Card, Row, Col, Form, Select, Image } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLayerGroup, faPenToSquare, faEye, faTrash, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import { DEFAUTL_PAGE_SIZE } from "../../../app/Constant/PaginationConstant";
import { ModalDetail } from "./components/ModalDetail";
import Swal from "sweetalert2";
import { useBranch } from "./hooks/useBranch";
import { ModalAddOrUpdate } from "./components/ModalAddOrUpdate";

export const BranchManagement = () => {

    //openModal
    const [openModalAddOrUpdate, setOpenModalAddOrUpdate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    //what Action
    const [whatAction, setWhatAction] = useState("post");
    //useForm
    const [form] = Form.useForm();

    //custom Hooks
    const {
        handleFetchDelete,
        handleFetchPut,
        handleFetchPost,
        handleFetchListSearch, listData, totalElement,
        handleFetchDetail, dataDetail, render,
        handleFetchGetOne,
        handleFetchListArea, listArea
    } = useBranch();

    //columns table
    const columns = [
        {
            title: "Ảnh Chi Nhánh", dataIndex: "image", key: "image",
            render: (image) => (
                <Image src={image} height={100} width={200} style={{ objectFit: "cover", borderRadius: "5px" }} />
            )
        },
        { title: "Mã Chi Nhánh", dataIndex: "code", key: "code" },
        { title: "Tên Chi Nhánh", dataIndex: "name", key: "name" },
        { title: "Email Chi Nhánh", dataIndex: "email", key: "email" },
        { title: "Địa Chỉ Chi Nhánh", dataIndex: "address", key: "address" },
        { title: "HostLine", dataIndex: "hostLine", key: "hostLine" },
        { title: "Khu Vực", dataIndex: "area", key: "area" },
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
                                handleFetchGetOne(record.id);
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
                        <Tooltip title={record.deleted ? "Xóa chi nhánh" : "Hoạt động lại"} color="red">
                            <Button style={{ backgroundColor: "red", color: "#fff" }} onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn thay đổi trạng thái của chi nhánh này?",
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
        handleFetchListSearch({
            inputSearch: "",
            areaId: ""
        }, 1);
        handleFetchListArea();
    }, []);

    //handleChangeSearchValue
    const handleSearchList = () => {
        handleFetchListSearch(form.getFieldsValue(), 1);
    }

    const handleClearFieldsValue = () => {
        form.resetFields();
        handleFetchListSearch(form.getFieldsValue(), 1);
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
                listArea={listArea}
            />}
            <div className="shadow-xl rounded-[5px] px-[20px] py-[20px]">
                <Card
                    title={
                        <p className="font-bold font-sans text-2xl mb-[10px]">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[10px]" />
                            Tìm kiếm chi nhánh
                        </p>
                    }
                >
                    <Form
                        form={form}
                        onFinish={handleSearchList}
                    >
                        <Row gutter={20} style={{
                            justifyContent: "center",
                            marginTop: "10px"
                        }}>
                            <Col span={11}>
                                <Form.Item
                                    label="Tìm kiếm"
                                    name="inputSearch"
                                >
                                    <Input placeholder="Tìm tiếm chi nhánh theo mã, tên, email, address, hostline..." />
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    label="Khu vực"
                                    name="areaId"
                                >
                                    <Select
                                        allowClear
                                        placeholder="--Chọn khu vực--"
                                        options={listArea.map(item => ({
                                            label: item.name,
                                            value: item.id
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="flex justify-center items-center">
                            <Button type="primary" htmlType="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[5px]" />
                                Tìm kiếm
                            </Button>
                            <Button type="primary" danger className="ml-[10px]" onClick={handleClearFieldsValue}>
                                <FontAwesomeIcon icon={faArrowsRotate} className="mr-[5px]" />
                                Làm mới bộ lọc
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className="mt-[50px]">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-[20px] ">
                        <FontAwesomeIcon icon={faLayerGroup} className="mr-[10px]" />
                        Danh sách chi nhánh
                    </p>
                    <Button onClick={() => {
                        setOpenModalAddOrUpdate(true);
                        setWhatAction("post");
                    }} type="primary" className="h-[40px]">Thêm Chi Nhánh</Button>
                </div>
                <Table
                    className="mt-[10px]"
                    columns={columns}
                    scroll={{ x: "1500px" }}
                    dataSource={listData}
                    pagination={false}
                >
                </Table>
                <Pagination onChange={(page) => {
                    handleFetchListSearch(form.getFieldsValue(), page);
                }}
                    pageSize={DEFAUTL_PAGE_SIZE}
                    total={totalElement}
                />
            </div>
        </>
    )
}