import { Card, Row, Col, Form, Input, Select, Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FilterOutlined } from "@ant-design/icons";

export const SearchComponent = () => {

    const [form] = Form.useForm();

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
            >
                <Row gutter={20} style={{
                    justifyContent: "center",
                    marginTop: "10px"
                }}>
                    <Col span={11}>
                        <Form.Item
                            label="Tên phim"
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Tác giả"
                            name="director"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn tác giả--"
                                options={[

                                ]}
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
                            label="Thể loại"
                            name="genre"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn thể loại--"
                                options={[

                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Phân giải"
                            name="format"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn phân giải--"
                                options={[

                                ]}
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
                            label="Đất nước"
                            name="country"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn đất nước--"
                                options={[

                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                    </Col>
                </Row>
                <div className="flex justify-center items-center">
                    <Button type="primary">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[5px]" />
                        Tìm kiếm
                    </Button>
                    <Button type="primary" danger className="ml-[10px]">
                        <FontAwesomeIcon icon={faArrowsRotate} className="mr-[5px]" />
                        Làm mới bộ lọc
                    </Button>
                </div>
            </Form>
        </Card>
    )
}