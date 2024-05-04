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
            title: whatAction === "post" ? "Bạn có chắc muốn thêm thể loại này?" : "Bạn có chắc muốn cập nhật thể loại này?",
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
                    fieldsValue.genreId = dataDetail.id;
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
                title={<Typography.Title level={3}>{whatAction === "post" ? "Thêm thể loại" : "Cập Nhật thể loại"}</Typography.Title>}
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
                            label="Tên thể loại"
                            name="name"
                            rules={[
                                { required: true, message: "Tên thể loại không được để trống!" }
                            ]}
                        >
                            <Input allowClear placeholder='Nhập tên thể loại...' />
                        </Form.Item>
                    </div>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">{whatAction === "post" ? "Thêm thể loại" : "Cập nhật thể loại"}</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )

}