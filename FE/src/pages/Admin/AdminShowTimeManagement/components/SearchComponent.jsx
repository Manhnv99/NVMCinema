import { Card, Row, Col, Form, Input, Select, Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FilterOutlined } from "@ant-design/icons";
import { useContext, useEffect } from "react";
import { ShowTimeContext } from "../store/context/context";
import { useFetchEntity } from "../hooks/useFetchEntity";
import { setInforSearchAction } from "../store/actions/ShowTimeActions";

export const SearchComponent = () => {

    //useContext
    const [state, dispatch] = useContext(ShowTimeContext);
    //useForm
    const [form] = Form.useForm();
    //custom Hooks
    const { handleFetchListArea, listArea,
        handleFetchListBranch, listBranch,
        handleFetchListRoom, listRoom
    } = useFetchEntity();

    useEffect(() => {
        handleFetchListArea();
    }, []);

    //handle
    const handleClearFieldsValue = () => {
        form.resetFields();
        dispatch(setInforSearchAction(form.getFieldsValue()));
    }

    const handleChangeSearchValue = () => {
        console.log(form.getFieldsValue());
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
                            name="movieName"
                        >
                            <Input allowClear placeholder="Nhập tên phim" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Khu Vực"
                            name="areaId"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn khu vực--"
                                options={listArea.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                onChange={(id) => {
                                    handleFetchListBranch(id);
                                }}
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
                            label="Chi nhánh"
                            name="branchId"
                        >
                            <Select
                                allowClear
                                placeholder="--Chọn chi nhánh--"
                                options={listBranch.map(item => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                                onChange={(id) => {
                                    handleFetchListRoom(id);
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label="Phòng chiếu"
                            name="roomId"
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