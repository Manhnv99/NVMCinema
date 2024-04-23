import { Form, Modal, Typography, Input, Select, Upload, Image, Button, Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, dataDetail, render, whatAction, handleFetchPut, handleFetchPost, listArea }) => {

    //useForm
    const [form] = Form.useForm();
    //upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageShow, setImageShow] = useState("");


    //useEffect
    useEffect(() => {
        setImageShow(dataDetail.image);
        handleFillFieldsValue(dataDetail);
    }, [render]);//state re-render;

    //handleAddOrUpdate
    const handleAddOrUpdate = () => {
        Swal.fire({
            title: whatAction === "post" ? "Bạn có chắc muốn thêm chi nhánh này?" : "Bạn có chắc muốn cập nhật chi nhánh này?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(result => {
            if (result.isConfirmed) {
                if (whatAction === "post") {
                    //fetchPost
                    const fieldsValue = { ...form.getFieldsValue() };
                    const postBranch = new FormData();
                    postBranch.append("name", fieldsValue.name);
                    postBranch.append("email", fieldsValue.email);
                    postBranch.append("address", fieldsValue.address);
                    postBranch.append("hostLine", fieldsValue.hostLine);
                    if (fieldsValue.image === undefined) {
                        postBranch.append("image", new File([], "empty-file"));
                    } else {
                        postBranch.append("image", fieldsValue.image.file.originFileObj);
                    }
                    postBranch.append("areaId", fieldsValue.areaId);
                    handleFetchPost(postBranch, handleCloseModal);
                } else {
                    const fieldsValue = { ...form.getFieldsValue() };
                    const putBranch = new FormData();
                    putBranch.append("id", dataDetail.id);
                    putBranch.append("name", fieldsValue.name);
                    putBranch.append("email", fieldsValue.email);
                    putBranch.append("address", fieldsValue.address);
                    putBranch.append("hostLine", fieldsValue.hostLine);
                    if (fieldsValue.image === undefined) {
                        putBranch.append("image", new File([], "empty-file"));
                    } else {
                        putBranch.append("image", fieldsValue.image.file.originFileObj);
                    }
                    putBranch.append("areaId", fieldsValue.areaId);
                    //fetchPut
                    handleFetchPut(putBranch, handleCloseModal);
                }
            }
        });
    };

    const handleFillFieldsValue = (data) => {
        form.setFieldsValue({
            name: data.name,
            email: data.email,
            address: data.address,
            hostLine: data.hostLine,
            areaId: data.areaId,
        });
    }

    const handleAddOrUpdateFailed = () => {
        message.warning = "Vui lòng điền đầy đủ thông tin!";
    };

    const handleCloseModal = () => {
        form.resetFields();
        setOpenModal(false);
    };

    //upload Image
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>{whatAction === "post" ? "Thêm Chi Nhánh" : "Cập Nhật Chi Nhánh"}</Typography.Title>}
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
                            label="Tên Chi Nhánh"
                            name="name"
                            rules={[
                                { required: true, message: "Tên chi nhánh không được để trống!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Email Chi Nhánh"
                            name="email"
                            rules={[
                                { required: true, message: "Email chi nhánh không được để trống!" },
                                { type: "email", message: "Email không đúng định dạng!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Địa Chỉ Chi Nhánh"
                            name="address"
                            rules={[
                                { required: true, message: "Địa chỉ chi nhánh không được để trống!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Hostline Chi Nhánh"
                            name="hostLine"
                            rules={[
                                { required: true, message: "Hostline chi nhánh không được để trống!" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Khu vực"
                            name="areaId"
                            rules={[
                                { required: true, message: "Khu vực chưa được chọn!" }
                            ]}
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
                    </div>
                    <div className="mb-[20px]">
                        {whatAction === "post"
                            ?
                            <Form.Item
                                label="Chọn ảnh"
                                name="image"
                                rules={[
                                    { required: true, message: "Bạn chưa chọn ảnh cho chi nhánh!" }
                                ]}
                            >
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    maxCount={1}
                                    onPreview={handlePreview}
                                >
                                    Upload
                                </Upload>
                            </Form.Item>
                            :
                            <Row>
                                <Col span={12}>
                                    <Image src={imageShow} height={200} style={{ width: "200px", objectFit: "cover", borderRadius: "5px" }} />
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Chọn ảnh"
                                        name="image"
                                    >
                                        <Upload
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            listType="picture-card"
                                            maxCount={1}
                                            onPreview={handlePreview}
                                        >
                                            Upload
                                        </Upload>
                                    </Form.Item>

                                </Col>
                            </Row>
                        }
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">{whatAction === "post" ? "Thêm chi nhánh" : "Cập nhật chi nhánh"}</Button>
                    </div>
                </Form>
            </Modal >
        </>
    )

}