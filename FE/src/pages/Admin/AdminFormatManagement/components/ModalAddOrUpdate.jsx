import { Form, Modal, Typography, Input, Radio, Button, message } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, dataDetail, render, whatAction, handleFetchPut, handleFetchPost }) => {

    //useForm
    const [form] = Form.useForm();


    //useEffect
    useEffect(() => {
        handleFillFieldsValue(dataDetail);
    }, [render]);//state re-render;

    //handleAddOrUpdate
    const handleAddOrUpdate = () => {
        Swal.fire({
            title: whatAction === "post" ? "Bạn có chắc muốn thêm phân giải này?" : "Bạn có chắc muốn cập nhật phân giải này này?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(result => {
            if (result.isConfirmed) {
                if (whatAction === "post") {
                    //fetchPost
                    handleFetchPost(form.getFieldsValue(), handleCloseModal);
                } else {
                    const fieldsValue = { ...form.getFieldsValue() };
                    fieldsValue.formatId = dataDetail.id;
                    //fetchPut
                    handleFetchPut(fieldsValue, handleCloseModal);
                }
            }
        });
    };

    const handleFillFieldsValue = (data) => {
        form.setFieldsValue({
            name: data.name,
        });
    }

    const handleAddOrUpdateFailed = () => {
        message.warning = "Vui lòng điền đầy đủ thông tin!";
    };

    const handleCloseModal = () => {
        form.resetFields();
        setOpenModal(false);
    };

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>{whatAction === "post" ? "Thêm phân giải" : "Cập Nhật Phân Giải"}</Typography.Title>}
                open={openModal}
                style={{ marginTop: '-50px' }} // Tùy chỉnh khoảng cách từ top
                onCancel={handleCloseModal}
                footer={null}>
                <Form
                    form={form}
                    onFinish={handleAddOrUpdate}
                    onFinishFailed={handleAddOrUpdateFailed}
                >
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Tên phân giải"
                            name="name"
                            rules={[
                                { required: true, message: "Tên phân giải không được để trống!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">{whatAction === "post" ? "Thêm phân giải" : "Cập nhật phân giải"}</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )

}