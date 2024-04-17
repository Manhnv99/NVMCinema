import { Card, Row, Col, Form, Input, Select, Button, DatePicker } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FilterOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { PromotionEventContext } from "../store/context/context";
import { setInforSearchAction } from "../store/actions/PromotionEventActions";
import dayjs from "dayjs";


export const SearchComponent = () => {
    //useForm
    const [form] = Form.useForm();
    //useContext
    const [state, dispatch] = useContext(PromotionEventContext);
    //custom hooks

    const handleChangeSearchValue = () => {
        let fieldsValue = {};
        const timeStart = form.getFieldsValue().timeStart;
        const timeEnd = form.getFieldsValue().timeEnd;
        if (timeStart === undefined || timeStart === null) {
            if (timeEnd !== undefined) {
                fieldsValue = {
                    ...form.getFieldsValue(),
                    timeStart: undefined,
                    timeEnd: dayjs(timeEnd).format("YYYY-MM-DD")
                };
            } else {
                fieldsValue = {
                    ...form.getFieldsValue(),
                    timeStart: undefined,
                    timeEnd: undefined,
                };
            }
        } else {
            if (timeEnd === undefined || timeEnd == null) {
                fieldsValue = {
                    ...form.getFieldsValue(),
                    timeStart: dayjs(timeStart).format("YYYY-MM-DD"),
                    timeEnd: undefined
                };
            } else {
                fieldsValue = {
                    ...form.getFieldsValue(),
                    timeStart: dayjs(timeStart).format("YYYY-MM-DD"),
                    timeEnd: dayjs(timeEnd).format("YYYY-MM-DD"),
                };
            }
        }
        dispatch(setInforSearchAction(fieldsValue));
    }

    const handleClearFieldsValue = () => {
        form.resetFields();
        dispatch(setInforSearchAction(form.getFieldsValue()));
    }

    return (
        <Card
            className="shadow-xl"
            title={
                <span className="text-[18px]">
                    <FilterOutlined className="text-[25px]" />
                    Bộ lọc
                </span>
            }
        >
            <Form
                form={form}
                onFinish={handleChangeSearchValue}
            >
                <Row gutter={20} style={{
                    justifyContent: "center",
                    marginTop: "10px"
                }}>
                    <Col span={11}>
                        <Form.Item
                            label="Tên sự kiện"
                            name="name"
                        >
                            <Input placeholder="Nhập tên sự kiên..." />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Ngày Bắt Đầu"
                            name="timeStart"
                        >
                            <DatePicker allowClear format={"YYYY-MM-DD"} placeholder="Chọn ngày bắt đầu" className="w-full" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20} style={{
                    justifyContent: "center",
                    marginTop: "10px"
                }}>
                    <Col span={11}>
                        <Form.Item
                            label="Ngày Kết Thúc"
                            name="timeEnd"
                        >
                            <DatePicker allowClear format={"YYYY-MM-DD"} placeholder="Chọn ngày kết thúc" className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col span={11} />
                </Row>
                <div className="flex justify-center items-center">
                    <Button type="primary" htmlType="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[5px]" />
                        Tìm kiếm
                    </Button>
                    <Button type="primary" danger className="ml-[10px]" onClick={handleClearFieldsValue}>
                        <FontAwesomeIcon icon={faArrowsRotate} className="mr-[5px]" />
                        Làm mới bộ lọc
                    </Button>
                </div>
            </Form>
        </Card>
    )
}