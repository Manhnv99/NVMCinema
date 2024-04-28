import { Form, Modal, Input, Row, Col, Select, Button, Switch, message, DatePicker, InputNumber } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { LIST_TIME_FRAME } from "../../../../app/Constant/ShowTimeConstant";
import dayjs from "dayjs";
import { useShowTime } from "../hooks/useShowTime";

export const ModalAddOrUpdate = ({ openModal, setOpenModal, whatAction, showTimeId, render }) => {

    //use Form
    const [form] = Form.useForm();
    //custom Hooks
    const {
        handleFetchListArea, listArea,
        handleFetchListBranch, listBranch,
        handleFetchListRoom, listRoom,
        handleFetchListMovie, listMovie
    } = useFetchEntity();

    const {
        handlePostShowTime,
        handlePutShowTime,
        handleFetchGetOneShowTime
    } = useShowTime();

    //useEffect
    useEffect(() => {
        handleFetchListArea();
        handleFetchListMovie();
    }, []);

    useEffect(() => {
        if (showTimeId !== "") {
            handleFetchGetOneShowTime(showTimeId).then(response => {
                handleFillFieldsValue(response.data.data)
            });
        }
    }, [render]);

    //For disable the past for Component DatePicker
    const isPast = (date) => {
        return dayjs(date).format("YYYY-MM-DD") < dayjs(new Date()).format("YYYY-MM-DD");
    };

    //handle
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
                    const postRequest = {
                        ...form.getFieldsValue(),
                        screeningDate: form.getFieldsValue().screeningDate.map(item => dayjs(item).format("YYYY-MM-DD"))
                    }
                    handlePostShowTime(postRequest, handleCloseModal);
                } else {
                    //put
                    const putRequest = {
                        ...form.getFieldsValue(),
                        screeningDate: dayjs(form.getFieldsValue().screeningDate).format("YYYY-MM-DD"),
                        id: showTimeId
                    }
                    handlePutShowTime(putRequest, handleCloseModal);
                }
            }
        });
    }

    const handleFillFieldsValue = (data) => {
        handleFetchListBranch(data.areaId);
        handleFetchListRoom(data.branchId)
        form.setFieldsValue({
            areaId: data.areaId,
            branchId: data.branchId,
            movieId: data.movieId,
            roomId: data.roomId,
            screeningDate: dayjs(data.screeningDate, "YYYY-MM-DD"),
            timeStart: data.timeStart,
            ticketPrice: data.ticketPrice
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
                                options={listMovie.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
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
                                onChange={(id) => {
                                    form.setFieldValue("branchId", null);
                                    form.setFieldValue("roomId", null);
                                    handleFetchListBranch(id);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="justify-center" gutter={16}>
                    <Col span={11}>
                        <Form.Item
                            label="Chi Nhánh"
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
                                onChange={(id) => {
                                    form.setFieldValue("roomId", null);
                                    handleFetchListRoom(id);
                                }}
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
                            <InputNumber formatter={formatter} parser={parser} placeholder="Điền giá vé..." className="w-full" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="justify-center" gutter={16}>
                    <Col span={22}>
                        <Form.Item
                            label="Ngày Chiếu"
                            name="screeningDate"
                            rules={[
                                { required: true, message: "Bạn chưa chọn ngày chiếu!" }
                            ]}
                        >
                            {whatAction === "post"
                                ?
                                <DatePicker multiple disabledDate={isPast} maxTagCount={"responsive"} allowClear format="YYYY-MM-DD" placeholder="Chọn ngày chiếuaaa" className="w-full" />
                                :
                                <DatePicker allowClear disabledDate={isPast} format="YYYY-MM-DD" placeholder="Chọn ngày chiếu" className="w-full" />
                            }
                        </Form.Item>
                    </Col>
                </Row>
                {/*  */}
                <Row className="justify-center">
                    {whatAction === "post"
                        ?
                        <Col span={22}>
                            <Form.Item
                                label="Phòng Chiếu"
                                name="roomId"
                                rules={[
                                    { required: true, message: "Bạn chưa chọn phòng chiếu!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    mode="multiple"
                                    placeholder="--Chọn phòng chiếu--"
                                    options={listRoom.map(item => ({
                                        label: item.name,
                                        value: item.id
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        :
                        <Col span={22}>
                            <Form.Item
                                label="Phòng Chiếu"
                                name="roomId"
                                rules={[
                                    { required: true, message: "Bạn chưa chọn phòng chiếu!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    placeholder="--Chọn phòng chiếu--"
                                    options={listRoom.map(item => ({
                                        label: item.name,
                                        value: item.id
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    }
                </Row>
                <Row className="justify-center">
                    {whatAction === "post"
                        ?
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
                                    options={LIST_TIME_FRAME.map(item => ({
                                        label: item,
                                        value: item
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        :
                        <Col span={22}>
                            <Form.Item
                                label="Giờ Chiếu"
                                name="timeStart"
                                rules={[
                                    { required: true, message: "Bạn chưa chọn giờ chiếu!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    placeholder="--Chọn giờ chiếu--"
                                    options={LIST_TIME_FRAME.map(item => ({
                                        label: item,
                                        value: item
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    }
                </Row>
                <div className="flex justify-end">
                    <Button htmlType="submit" type="primary">{whatAction === "post" ? "Tạo xuất chiếu" : "Cập nhật xuất chiếu"}</Button>
                </div>
            </Form>
        </Modal>
    )

}