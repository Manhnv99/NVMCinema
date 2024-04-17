import { Form, Modal, Input, Row, Col, Upload, Button, Image, message, DatePicker, InputNumber } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { usePromotionEvent } from "../hooks/usePromotionEvent";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, whatAction, PEId, render }) => {
    //use Form
    const [form] = Form.useForm();
    //custom Hooks
    const {
        handleFetchDetail,
        handleFetchPost,
        handleFetchPut
    } = usePromotionEvent();
    //upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageShow, setImageShow] = useState("");
    //useEffect
    useEffect(() => {

    }, []);

    useEffect(() => {
        if (PEId !== "") {
            handleFetchDetail(PEId).then(response => {
                setImageShow(response.data.data.imageUrl)
                handleFillFieldsValue(response.data.data);
            });
        }
    }, [render]);

    //handle
    const handleAddOrUpdate = () => {
        Swal.fire({
            title: whatAction === "post" ? "Bạn có chắc muốn thêm sự kiện này?" : "Bạn có chắc muốn cập nhật sự kiện này?",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(result => {
            if (result.isConfirmed) {
                if (whatAction === "post") {
                    //post
                    const fieldsValue = {
                        ...form.getFieldsValue(),
                        timeStart: dayjs(form.getFieldsValue().timeStart).format("YYYY-MM-DD"),
                        timeEnd: dayjs(form.getFieldsValue().timeEnd).format("YYYY-MM-DD")
                    }
                    const postRequest = new FormData();
                    postRequest.append("name", fieldsValue.name);
                    postRequest.append("timeStart", fieldsValue.timeStart);
                    postRequest.append("timeEnd", fieldsValue.timeEnd);
                    postRequest.append("promotionCode", fieldsValue.promotionCode);
                    postRequest.append("promotionPrice", fieldsValue.promotionPrice);
                    postRequest.append("description", fieldsValue.description);
                    if (fieldsValue.image === undefined) {
                        postRequest.append("image", new File([], "empty-file"));
                    } else {
                        postRequest.append("image", fieldsValue.image.file.originFileObj);
                    }
                    handleFetchPost(postRequest, handleCloseModal);
                } else {
                    //put
                    const fieldsValue = {
                        ...form.getFieldsValue(),
                        timeStart: dayjs(form.getFieldsValue().timeStart).format("YYYY-MM-DD"),
                        timeEnd: dayjs(form.getFieldsValue().timeEnd).format("YYYY-MM-DD")
                    }
                    const putRequest = new FormData();
                    putRequest.append("id", PEId);
                    putRequest.append("name", fieldsValue.name);
                    putRequest.append("timeStart", fieldsValue.timeStart);
                    putRequest.append("timeEnd", fieldsValue.timeEnd);
                    putRequest.append("promotionCode", fieldsValue.promotionCode);
                    putRequest.append("promotionPrice", fieldsValue.promotionPrice);
                    putRequest.append("description", fieldsValue.description);
                    if (fieldsValue.image === undefined) {
                        putRequest.append("image", new File([], "empty-file"));
                    } else {
                        putRequest.append("image", fieldsValue.image.file.originFileObj);
                    }
                    handleFetchPut(putRequest, handleCloseModal);
                }
            }
        });
    }

    const handleFillFieldsValue = (data) => {
        form.setFieldsValue({
            name: data.name,
            timeStart: data.timeStart,
            timeEnd: data.timeEnd,
            promotionCode: data.promotionCode,
            promotionPrice: data.promotionPrice,
            description: data.description,
            timeStart: dayjs(data.dateStart, "YYYY-MM-DD"),
            timeEnd: dayjs(data.dateEnd, "YYYY-MM-DD")
        });
    };

    const handleAddOrUpdateFailed = () => {
        message.warning("Vui lòng điền đầy đủ thông tin!");
    }

    const handleCloseModal = () => {
        form.resetFields();
        setOpenModal(false);
    }

    const formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ';
    const parser = value => value.replace(/VNĐ\s?|(,*)/g, '');

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
        <Modal
            title={<span className="font-bold text-[20px]">{whatAction === "post" ? "Tạo sự kiện" : "Cập nhật sự kiện"}</span>}
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
                            label="Tên sự kiện"
                            name="name"
                            rules={[
                                { required: true, message: "Tên sự kiện không được để trống!" }
                            ]}
                        >
                            <Input placeholder="Nhập tên sự kiện" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Mã khuyến mãi"
                            name="promotionCode"
                            rules={[
                                { required: true, message: "Mã khuyến mãi sự kiện không được để trống!" }
                            ]}
                        >
                            <Input placeholder="Nhập mã khuyến mãi sự kiện" />
                        </Form.Item>
                    </Col>
                </Row>
                {/*  */}
                <Row className="justify-center" gutter={16}>
                    <Col span={11}>
                        <Form.Item
                            label="Giá khuyến mãi"
                            name="promotionPrice"
                            rules={[
                                { required: true, message: "Giá khuyến mãi không được để trống!" }
                            ]}
                        >
                            <InputNumber formatter={formatter} parser={parser} placeholder="Điền giá vé..." className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Mô tả sự kiện"
                            name="description"
                            rules={[
                                { required: true, message: "Mô tả sự kiện không được để trống!" }
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập mô tả sự kiện" />
                        </Form.Item>
                    </Col>
                </Row>
                {/*  */}
                <Row className="justify-center" gutter={16}>
                    <Col span={11}>
                        <Form.Item
                            label="Ngày Bắt Đầu"
                            name="timeStart"
                            rules={[
                                { required: true, message: "Bạn chưa chọn ngày bắt đầu sự kiện!" }
                            ]}
                        >
                            <DatePicker allowClear format="YYYY-MM-DD" placeholder="Chọn ngày bắt đầu sự kiện" className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Ngày Kết Thúc"
                            name="timeEnd"
                            rules={[
                                { required: true, message: "Bạn chưa chọn ngày kết thúc sự kiện!" }
                            ]}
                        >
                            <DatePicker allowClear format="YYYY-MM-DD" placeholder="Chọn ngày kết thúc sự kiện" className="w-full" />
                        </Form.Item>
                    </Col>
                </Row>
                {/*  */}
                <Row className="justify-center" gutter={16}>
                    {whatAction === "post"
                        ?
                        <>
                            <Col span={11}>
                                <Form.Item
                                    label="Ảnh Sự Kiện"
                                    name="image"
                                    rules={[
                                        { required: true, message: "Bạn chưa chọn ảnh cho sự kiện này!" }
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
                            </Col>
                            <Col span={11} />
                        </>
                        :
                        <>
                            <Col span={11}>
                                <Form.Item
                                    label="Ảnh Sự Kiện"
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
                            </Col>
                            <Col span={11}>
                                <Image
                                    className="w-full rounded-[5px]"
                                    src={imageShow}
                                />
                            </Col>
                        </>
                    }
                </Row>
                <div className="flex justify-end">
                    <Button htmlType="submit" type="primary">{whatAction === "post" ? "Tạo xuất chiếu" : "Cập nhật xuất chiếu"}</Button>
                </div>
            </Form>
        </Modal>
    )
}