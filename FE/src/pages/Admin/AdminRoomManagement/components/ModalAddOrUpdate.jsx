import { Form, Modal, Input, Row, Col, Select, Button, Switch, message } from "antd";
import { useRoom } from "../hooks/useRoom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, whatAction, id, render }) => {

    //use Form
    const [form] = Form.useForm();
    //state
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [onUpdateChair, setOnUpdateChair] = useState(false);
    const [totalChair, setTotalChair] = useState(0);
    //custom Hooks
    const { handleFetchListArea, listArea,
        handleFetchListBranch, listBranch,
        handleFetchPostBranch,
        handleFetchPutBranch,
        handleFetchOneRoom
    } = useRoom();


    useEffect(() => {
        handleFetchListArea();
    }, []);

    useEffect(() => {
        if (whatAction === "put") {
            handleFetchOneRoom(id).then(response => {
                handleFillFieldsValue(response.data.data);
            })
        }
    }, [render]);

    const handleFillFieldsValue = (data) => {
        setTotalChair(data.totalChair);
        handleFetchListBranch(data.areaId);
        form.setFieldsValue({
            name: data.name,
            areaId: data.areaId,
            branchId: data.branchId,
        });
    }

    const handleAddOrUpdate = () => {
        Swal.fire({
            title: whatAction === "post" ? "Bạn có chắc muốn thêm phòng chiếu này?" : "Bạn có chắc muốn cập nhật phòng chiếu này?",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(result => {
            if (result.isConfirmed) {
                if (whatAction === "post") {
                    const { columnsFrom, columnsTo, name, branchId, row } = form.getFieldsValue();
                    const myColumns = [];
                    // Lấy mã Unicode của columnsFrom và columnsTo
                    const startCharCode = columnsFrom.charCodeAt(0);
                    const endCharCode = columnsTo.charCodeAt(0);

                    // Đảm bảo columnsFrom nhỏ hơn hoặc bằng columnsTo
                    if (startCharCode <= endCharCode) {
                        // Tạo mảng các ký tự từ startCharCode đến endCharCode
                        for (let i = startCharCode; i <= endCharCode; i++) {
                            myColumns.push(String.fromCharCode(i));
                        }
                    }

                    // Tạo đối tượng postRequest với các giá trị đã xác định
                    const postRequest = {
                        name,
                        branchId,
                        row,
                        columns: myColumns
                    };
                    handleFetchPostBranch(postRequest, handleCloseModal);
                } else {
                    const { columnsFrom, columnsTo, name, branchId, row } = form.getFieldsValue();
                    const myColumns = [];
                    if (columnsFrom && columnsTo && row !== undefined) {
                        // Lấy mã Unicode của columnsFrom và columnsTo
                        const startCharCode = columnsFrom.charCodeAt(0);
                        const endCharCode = columnsTo.charCodeAt(0);

                        // Đảm bảo columnsFrom nhỏ hơn hoặc bằng columnsTo
                        if (startCharCode <= endCharCode) {
                            // Tạo mảng các ký tự từ startCharCode đến endCharCode
                            for (let i = startCharCode; i <= endCharCode; i++) {
                                myColumns.push(String.fromCharCode(i));
                            }
                        }
                    }

                    // Tạo đối tượng postRequest với các giá trị đã xác định
                    const putRequest = {
                        id,
                        name,
                        branchId,
                        row,
                        columns: myColumns
                    };
                    handleFetchPutBranch(putRequest, handleCloseModal);
                }
            }
        });
    }

    const handleAddOrUpdateFailed = () => {
        message.warning("Vui lòng điền đầy đủ thông tin!");
    }

    const handleCloseModal = () => {
        form.resetFields();
        setOpenModal(false);
        setOnUpdateChair(false);
    }

    return (
        <Modal
            title={<span className="font-bold text-[20px]">{whatAction === "post" ? "Thêm phòng chiếu" : "Cập nhật phòng chiếu"}</span>}
            open={openModal}
            footer={null}
            onCancel={handleCloseModal}
        >
            <Form
                form={form}
                onFinish={handleAddOrUpdate}
                onFinishFailed={handleAddOrUpdateFailed}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Tên phòng chiếu"
                            name="name"
                            rules={[
                                { required: true, message: "Tên phòng chiếu không được để trống!" }
                            ]}
                        >
                            <Input allowClear placeholder="Nhập tên phòng chiếu..." />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Khu Vực"
                            name="areaId"
                            rules={[
                                { required: true, message: "Bạn chưa chọn khu vực!" }
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn khu vực--"
                                options={listArea.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                onChange={(areaId => handleFetchListBranch(areaId))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Chi nhánh"
                            name="branchId"
                            rules={[
                                { required: true, message: "Bạn chưa chọn chi nhánh!" }
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn chi nhánh--"
                                options={listBranch.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {whatAction === "put" &&
                            <div className="flex items-center">
                                <span className="mr-[5px]">Số lượng ghế: {totalChair}</span>
                                <Switch value={onUpdateChair} checkedChildren="Tắt cập nhật ghế" unCheckedChildren="Cập nhật ghế" onChange={() => setOnUpdateChair(!onUpdateChair)} />
                            </div>
                        }
                    </Col>
                </Row>
                {onUpdateChair || whatAction === "post" ?
                    <>
                        <Row className="mt-[20px]">
                            <Col span={24}>
                                <Form.Item
                                    label="Cột hàng ghế từ"
                                    name="columnsFrom"
                                    rules={[
                                        { required: true, message: "Cột hàng ghế không được để trống!" },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        placeholder="--Chọn dãy ghế--"
                                        options={alphabet.map(item => ({
                                            label: item,
                                            value: item
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Cột hàng ghế đến"
                                    name="columnsTo"
                                    rules={[
                                        { required: true, message: "Cột hàng ghế không được để trống!" },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        placeholder="--Chọn dãy ghế--"
                                        options={alphabet.map(item => ({
                                            label: item,
                                            value: item
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Dãy hàng ghế"
                                    name="row"
                                    rules={[
                                        { required: true, message: "Dãy hàng ghế không được để trống!" }
                                    ]}
                                >
                                    <Input placeholder="Nhập dãy hàng ghế" type="number" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                    : ""
                }
                <div className="flex justify-end">
                    <Button htmlType="submit" type="primary">{whatAction === "post" ? "Thêm phòng chiếu" : "Cập nhật phòng chiếu"}</Button>
                </div>
            </Form>
        </Modal>
    )

}