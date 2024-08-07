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
            title: whatAction === "post" ? "Bạn có chắc muốn thêm đạo diễn này?" : "Bạn có chắc muốn cập nhật đạo diễn này?",
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
                    fieldsValue.directorId = dataDetail.id;
                    //fetchPut
                    handleFetchPut(fieldsValue, handleCloseModal);
                }
            }
        });
    };

    const handleFillFieldsValue = (data) => {
        form.setFieldsValue({
            name: data.name,
            gender: data.gender,
            age: data.age,
            description: data.description
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
                title={<Typography.Title level={3}>{whatAction === "post" ? "Thêm Đạo Diễn" : "Cập Nhật Đạo Diễn"}</Typography.Title>}
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
                            label="Tên Đạo Diễn"
                            name="name"
                            rules={[
                                { required: true, message: "Tên đạo diễn không được để trống!" }
                            ]}
                        >
                            <Input allowClear placeholder='Nhập tên đạo diễn...' />
                        </Form.Item>
                    </div>
                    {/*  */}
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Giới Tính"
                            name="gender"
                            rules={[
                                { required: true, message: "Giới tính chưa được chọn!" }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>Nam</Radio>
                                <Radio value={false}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    {/*  */}
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Tuổi"
                            name="age"
                            rules={[
                                { required: true, message: "Tuổi đạo diễn không được để trống!" }
                            ]}
                        >
                            <Input type="number" allowClear placeholder='Nhập tuổi đạo diễn...' />
                        </Form.Item>
                    </div>
                    {/*  */}
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[
                                { required: true, message: "Mô tả đạo diễn không được để trống!" }
                            ]}
                        >
                            <Input allowClear placeholder='Nhập mô tả đạo diễn...' />
                        </Form.Item>
                    </div>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">{whatAction === "post" ? "Thêm đạo diễn" : "Cập nhật đạo diễn"}</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )

}