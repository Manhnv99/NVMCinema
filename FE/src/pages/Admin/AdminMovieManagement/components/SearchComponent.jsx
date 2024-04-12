import { Card, Row, Col, Form, Input, Select, Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FilterOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { MovieContext } from "../store/context/context";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { setInforSearchAction } from "../store/actions/movieActions";

export const SearchComponent = () => {

    //useForm
    const [form] = Form.useForm();
    //useContext
    const [state, dispatch] = useContext(MovieContext);
    //custom hooks
    const { listCountry, listDirector, listGenre, listFormat } = useFetchEntity();


    const handleChangeSearchValue = () => {
        dispatch(setInforSearchAction(form.getFieldsValue()));
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
                                options={listDirector.map(item => ({
                                    label: item.name,
                                    value: item.name
                                }))}
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
                                options={listGenre.map(item => ({
                                    label: item.name,
                                    value: item.name,
                                }))}
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
                                options={listFormat.map(item => ({
                                    label: item.name,
                                    value: item.name
                                }))}
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
                                options={listCountry.map(item => ({
                                    label: item.name,
                                    value: item.name
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
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
    )
}