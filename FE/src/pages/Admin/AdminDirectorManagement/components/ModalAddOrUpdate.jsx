import { Form, Modal, Typography, Input, message } from "antd";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, directorId }) => {

    //useForm
    const [form] = Form.useForm();


    //handleAddOrUpdate
    const handleAddOrUpdate = () => {

    };

    const handleAddOrUpdateFailed = () => {
        message.warning = "Vui lòng điền đầy đủ thông tin!";
    };

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>{directorId === undefined ? "Thêm Đạo Diễn" : "Cập Nhật Đạo Diễn"}</Typography.Title>}
                open={openModal}
                style={{ marginTop: '-50px' }} // Tùy chỉnh khoảng cách từ top
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <Form
                    form={form}
                    onFinish={handleAddOrUpdate}
                    onFinishFailed={handleAddOrUpdateFailed}
                >
                    <Form.Item
                        label="Tên Đạo Diễn"
                        name="name"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giới Tính"
                        name="gender"

                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )

}