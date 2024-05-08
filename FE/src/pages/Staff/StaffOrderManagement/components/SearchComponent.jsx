import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FilterOutlined } from "@ant-design/icons";
import { OrderContext } from "../store/context/context";
import { useContext } from "react";
import { LIST_TIME_FRAME } from "../../../../app/Constant/ShowTimeConstant";
import { setInforSearchAction } from "../store/actions/OrderActions";
import { messageWarResponse } from "../../../../app/CustomizeMessage/CustomizeMessage";
import dayjs from "dayjs";

export const SearchComponent = () => {

    //useForm
    const [form] = Form.useForm();
    //useContext
    const [state, dispatch] = useContext(OrderContext);

    //handle Function
    const handleChangeSearchValue = () => {
        let dateStart = form.getFieldsValue().dateStart;
        let dateEnd = form.getFieldsValue().dateEnd;
        if (dateStart !== undefined && dateEnd === undefined) {
            messageWarResponse("Ngày kết thúc không được để trống!");
        } else if (dateStart === undefined && dateEnd !== undefined) {
            messageWarResponse("Ngày bắt đầu không được để trống!");
        } else if (dateStart === undefined && dateEnd === undefined) {
            dispatch(setInforSearchAction(form.getFieldsValue()));
        } else {
            const searchValue = {
                ...form.getFieldsValue(),
                dateStart: dayjs(form.getFieldsValue().dateStart).format("YYYY-MM-DD"),
                dateEnd: dayjs(form.getFieldsValue().dateEnd).format("YYYY-MM-DD"),
            }
            dispatch(setInforSearchAction(searchValue));
        }
    };

    const handleClearFieldsValue = () => {
        form.resetFields();
        dispatch(setInforSearchAction(form.getFieldsValue()));
    };

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
                            label="Mã Vé"
                            name="orderCode"
                        >
                            <Input allowClear placeholder="Nhập mã vé..." />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Ngày Bắt Đầu"
                            name="dateStart"
                        >
                            <DatePicker
                                allowClear
                                format={"YYYY-MM-DD"}
                                placeholder="--Chọn ngày bắt đầu--"
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20} style={{
                    justifyContent: "center",
                    marginTop: "10px"
                }}>
                    <Col span={11}>
                        <Form.Item
                            label="Xuất chiếu"
                            name="timeStart"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn xuất chiếu--"
                                options={LIST_TIME_FRAME.map(item => ({
                                    label: item,
                                    value: item
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Ngày Kết Thúc"
                            name="dateEnd"
                        >
                            <DatePicker
                                allowClear
                                format={"YYYY-MM-DD"}
                                placeholder="--Chọn ngày kết thúc--"
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
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
    );
};