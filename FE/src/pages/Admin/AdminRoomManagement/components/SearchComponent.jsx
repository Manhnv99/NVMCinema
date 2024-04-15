import { Card, Row, Col, Form, Input, Select, Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FilterOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../store/context/context";
import { setInforSearchRoomAction } from "../store/actions/RoomActions";
import { useRoom } from "../hooks/useRoom";

export const SearchComponent = () => {

    //useForm
    const [form] = Form.useForm();
    //use Context
    const [state, dispatch] = useContext(RoomContext);
    //custom Hooks
    const { handleFetchListArea, listArea,
        handleFetchListBranch, listBranch } = useRoom();

    const handleChangeSearchValue = () => {
        dispatch(setInforSearchRoomAction(form.getFieldsValue()));
    }

    const handleClearFieldsValue = () => {
        form.resetFields();
        dispatch(setInforSearchRoomAction(form.getFieldsValue()));
    }

    useEffect(() => {
        handleFetchListArea();
    }, []);

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
                    <Col span={12}>
                        <Form.Item
                            label="Tìm kiếm"
                            name="inputSearch"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Khu Vực"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn khu vực--"
                                options={listArea.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                onChange={(areaId) => handleFetchListBranch(areaId)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Chi Nhánh"
                            name="branchId"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn chi nhánh--"
                                options={listBranch.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
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
    )
}