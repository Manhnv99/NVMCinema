import { Form, Modal, Typography, Input, Button, message, Upload, Row, Col, Image, InputNumber } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, dataDetail, render, whatAction, handleFetchPut, handleFetchPost }) => {

    //useForm
    const [form] = Form.useForm();
    //upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageShow, setImageShow] = useState("");

    //useEffect
    useEffect(() => {
        if (whatAction === "put") {
            console.log(dataDetail);
            setImageShow(dataDetail.imageUrl);
            handleFillFieldsValue(dataDetail);
        }
    }, [render]);//state re-render;

    //handleAddOrUpdate
    const handleAddOrUpdate = () => {
        Swal.fire({
            title: whatAction === "post" ? "Bạn có chắc muốn thêm combo này?" : "Bạn có chắc muốn cập nhật combo này?",
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
                    postBranch.append("price", fieldsValue.price);
                    if (fieldsValue.image === undefined) {
                        postBranch.append("image", new File([], "empty-file"));
                    } else {
                        postBranch.append("image", fieldsValue.image.file.originFileObj);
                    }
                    handleFetchPost(postBranch, handleCloseModal);
                } else {
                    //fetchPut
                    const fieldsValue = { ...form.getFieldsValue() };
                    const putBranch = new FormData();
                    putBranch.append("id", dataDetail.id);
                    putBranch.append("name", fieldsValue.name);
                    putBranch.append("price", fieldsValue.price);
                    if (fieldsValue.image === undefined) {
                        putBranch.append("image", new File([], "empty-file"));
                    } else {
                        putBranch.append("image", fieldsValue.image.file.originFileObj);
                    }
                    handleFetchPut(putBranch, handleCloseModal);
                }
            }
        });
    };

    const handleFillFieldsValue = (data) => {
        form.setFieldsValue({
            name: data.name,
            price: data.price,
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

    const formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ';
    const parser = value => value.replace(/VNĐ\s?|(,*)/g, '');

    return (
        <>
            <Modal
                title={<Typography.Title level={3}>{whatAction === "post" ? "Thêm ComboFood" : "Cập Nhật ComboFood"}</Typography.Title>}
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
                            label="Tên Combo"
                            name="name"
                            rules={[
                                { required: true, message: "Tên combo không được để trống!" }
                            ]}
                        >
                            <Input allowClear placeholder='Nhập tên combo...' />
                        </Form.Item>
                    </div>
                    <div className="mb-[20px]">
                        <Form.Item
                            label="Giá Combo"
                            name="price"
                            rules={[
                                { required: true, message: "Giá combo không được để trống!" }
                            ]}
                        >
                            <InputNumber formatter={formatter} parser={parser} placeholder="Điền giá vé..." className="w-full" />
                        </Form.Item>
                    </div>
                    <div className="mb-[20px]">
                        {whatAction === "post"
                            ?
                            <Form.Item
                                label="Chọn ảnh"
                                name="image"
                                rules={[
                                    { required: true, message: "Bạn chưa chọn ảnh cho ComboFood!" }
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
                        <Button type="primary" htmlType="submit">{whatAction === "post" ? "Thêm ComboFood" : "Cập nhật ComboFood"}</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )

}