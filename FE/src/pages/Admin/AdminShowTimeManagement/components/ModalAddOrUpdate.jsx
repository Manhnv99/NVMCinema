import { Form, Modal, Input, Row, Col, Select, Button, Switch, message } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, whatAction, id, render }) => {

    //use Form
    const [form] = Form.useForm();
    //custom Hooks

    const handleAddOrUpdate = () => {
        Swal.fire({
            title: whatAction === "post" ? "Bạn có chắc muốn thêm xuất chiếu này?" : "Bạn có chắc muốn cập nhật xuất chiếu này?",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(result => {
            if (result.isConfirmed) {
                if (whatAction === "post") {
                    //post
                } else {
                    //put
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
    }

    return (
        <Modal
            title={<span className="font-bold text-[20px]">{whatAction === "post" ? "Tạo xuất chiếu" : "Cập nhật xuất chiếu"}</span>}
            open={openModal}
            footer={null}
            onCancel={handleCloseModal}
            width={900}
        >
            <Form
                form={form}
                onFinish={handleAddOrUpdate}
                onFinishFailed={handleAddOrUpdateFailed}
            >
                <Row className="justify-center" gutter={16}>
                    <Col span={11}>
                        <Form.Item
                            label="Phim"
                            name="movieId"
                            rules={[
                                { required: true, message: "Bạn chưa chọn phim!" }
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn phim--"
                            // options={listArea.map(item => ({
                            //     label: item.name,
                            //     value: item.id
                            // }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Chọn Khu Vực"
                            name="areaId"
                            rules={[
                                { required: true, message: "Bạn chưa chọn khu vực!" }
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn khu vực--"
                            // options={listBranch.map(item => ({
                            //     label: item.name,
                            //     value: item.id
                            // }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="justify-center" gutter={16}>
                    <Col span={11}>
                        <Form.Item
                            label="Chọn Chi Nhánh"
                            name="branchId"
                            rules={[
                                { required: true, message: "Bạn chưa chọn chi nhánh!" }
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn chi nhánh--"
                            // options={listArea.map(item => ({
                            //     label: item.name,
                            //     value: item.id
                            // }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Chọn Phòng Chiếu"
                            name="roomId"
                            rules={[
                                { required: true, message: "Bạn chưa chọn phòng chiếu!" }
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn phòng chiếu--"
                            // options={listBranch.map(item => ({
                            //     label: item.name,
                            //     value: item.id
                            // }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="justify-center" gutter={16}>
                    <Col span={11}>
                        <Form.Item
                            label="Chọn Ngày Chiếu"
                            name="screeningDate"
                            rules={[
                                { required: true, message: "Bạn chưa chọn ngày chiếu!" }
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn ngày chiếu--"
                            // options={listArea.map(item => ({
                            //     label: item.name,
                            //     value: item.id
                            // }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Giá Vé"
                            name="ticketPrice"
                            rules={[
                                { required: true, message: "Bạn chưa điền giá vé!" }
                            ]}
                        >
                            <Input placeholder="Điền giá vé..." />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="justify-center">
                    <Col span={22}>
                        <Form.Item
                            label="Giờ Chiếu"
                            name="timeStart"
                            rules={[
                                { required: true, message: "Bạn chưa chọn giờ chiếu!" }
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="--Chọn giờ chiếu--"
                            // options={listArea.map(item => ({
                            //     label: item.name,
                            //     value: item.id
                            // }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="flex justify-end">
                    <Button htmlType="submit" type="primary">{whatAction === "post" ? "Tạo xuất chiếu" : "Cập nhật xuất chiếu"}</Button>
                </div>
            </Form>
        </Modal>
    )

}