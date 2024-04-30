import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FilterOutlined } from "@ant-design/icons";
import { OrderContext } from "../store/context/context";
import { useContext } from "react";
import { LIST_TIME_FRAME } from "../../../../app/Constant/ShowTimeConstant";
import { setInforSearchAction } from "../store/actions/OrderActions";

export const SearchComponent = () => {

    //useForm
    const [form] = Form.useForm();
    //useContext
    const [state, dispatch] = useContext(OrderContext);

    //handle Function
    const handleChangeSearchValue = () => {
        dispatch(setInforSearchAction(form.getFieldsValue()));
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
                            label="Ngày"
                            name="date"
                        >
                            <DatePicker
                                allowClear
                                format={"YYYY-MM-DD"}
                                placeholder="Chọn ngày"
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
    );
};