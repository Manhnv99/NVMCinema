import { Form, Modal, Typography, Input, Radio, Button, message } from "antd";
import { useDirector } from "../hooks/useDirector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DirectorManagementAPI } from "../../../../apis/Admin/Directormanagement/DirectorManagementAPI";
import { setLoadingFalse, setLoadingTrue } from "../../../../app/Redux/Slice/LoadingSlice";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, directorId, whatAction, setWhatAction }) => {

    //useForm
    const [form] = Form.useForm();
    //custom Hooks
    const { fetchPostDirector, fetchPutDirector } = useDirector();
    //dispatch
    const dispatch = useDispatch();


    //useEffect
    useEffect(() => {
        if (whatAction === "put") {
            handleFetchDetail(directorId);
        }
    }, [directorId, whatAction]);

    //handleAddOrUpdate
    const handleAddOrUpdate = () => {
        if (whatAction === "post") {
            //fetchPost
            fetchPostDirector(form.getFieldsValue(), handleCloseModal);
        } else {
            const fieldsValue = { ...form.getFieldsValue() };
            fieldsValue.directorId = directorId;
            //fetchPost
            fetchPutDirector(fieldsValue, handleCloseModal);
        }
    };

    //handleGetDetail
    const handleFetchDetail = async (directorId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await DirectorManagementAPI.fetchDetailDirector(directorId);
            dispatch(setLoadingFalse());
            handleFillFieldsValue(response.data.data);
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
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
        if (whatAction === "post") {
            setWhatAction("put");
        } else {
            setWhatAction("post");
        }
        setOpenModal(false);
    };

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>{directorId === undefined ? "Thêm Đạo Diễn" : "Cập Nhật Đạo Diễn"}</Typography.Title>}
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
                            <Input />
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
                            <Input type="number" />
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
                            <Input />
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