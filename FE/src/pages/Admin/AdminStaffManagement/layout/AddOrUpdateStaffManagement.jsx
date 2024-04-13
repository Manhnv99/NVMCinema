import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_MANAGEMENT_STAFF } from '../../../../app/BaseUrl/BaseUrl';
import { Form, message, Input, Row, Col, Radio, Button, Select, DatePicker, Upload, Image } from "antd";
import { useArea } from '../hooks/useArea';
import dayjs from 'dayjs';
import { ROLE_ADMIN, ROLE_ADMIN_AREA, ROLE_STAFF } from '../../../../app/Constant/RoleConstant';
import { useStaff } from '../hooks/useStaff';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { StaffManagementAPI } from '../../../../apis/Admin/StaffManagement/StaffManagementAPI';
import { setLoadingFalse, setLoadingTrue } from '../../../../app/Redux/Slice/LoadingSlice';
import Swal from "sweetalert2";

export const AddOrUpdateStaffManagement = () => {

    //useForm
    const [form] = Form.useForm();
    //useNav
    const navigate = useNavigate();
    //useDispatch
    const dispatch = useDispatch();
    //custom Hooks
    const { listArea } = useArea();
    const { fetchRegister, fetchPutRegister } = useStaff();
    //upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    //useParam
    const { id } = useParams();


    //useEffect
    useEffect(() => {
        if (id !== undefined) {
            fetchOneStaff(id);
        }
    }, []);

    //handle Add
    const handleAddOrUpdateStaff = () => {
        const result = Swal.fire({
            title: id === undefined ? "Bạn có chắc muốn thêm nhân viên này?" : "Bạn có chắc muốn cập nhật nhân viên này?",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        });
        if (result.isConfirmed) {
            if (id === undefined) {
                const fieldsValue = {
                    ...form.getFieldsValue(),
                    birthDay: dayjs(form.getFieldsValue().birthDay).format("YYYY-MM-DD")
                };
                const formData = new FormData();
                formData.append("code", fieldsValue.code);
                formData.append("name", fieldsValue.name);
                formData.append("cccd", fieldsValue.cccd);
                formData.append("gender", fieldsValue.gender);
                formData.append("birthDay", fieldsValue.birthDay);
                formData.append("email", fieldsValue.email);
                formData.append("password", fieldsValue.password);
                formData.append("phoneNumber", fieldsValue.phoneNumber);
                formData.append("address", fieldsValue.address);
                formData.append("role", fieldsValue.role);
                formData.append("areaId", fieldsValue.areaId);
                if (fieldsValue.image === undefined) {
                    formData.append("image", new File([], "empty-file"));
                } else {
                    formData.append("image", fieldsValue.image.file.originFileObj);
                }
                fetchRegister(formData);
            } else {
                //put Staff
                const fieldsValue = {
                    ...form.getFieldsValue(),
                    birthDay: dayjs(form.getFieldsValue().birthDay).format("YYYY-MM-DD")
                };
                const formData = new FormData();
                formData.append("id", id);
                formData.append("code", fieldsValue.code);
                formData.append("name", fieldsValue.name);
                formData.append("cccd", fieldsValue.cccd);
                formData.append("gender", fieldsValue.gender);
                formData.append("birthDay", fieldsValue.birthDay);
                formData.append("email", fieldsValue.email);
                formData.append("phoneNumber", fieldsValue.phoneNumber);
                formData.append("address", fieldsValue.address);
                formData.append("role", fieldsValue.role);
                formData.append("areaId", fieldsValue.areaId);
                if (fieldsValue.image === undefined) {
                    formData.append("image", new File([], "empty-file"));
                } else {
                    formData.append("image", fieldsValue.image.file.originFileObj);
                }
                fetchPutRegister(formData);
            }
        }
    }

    //handle Add Staff Failed
    const handleAddStaffFailed = () => {
        message.warning("Vui lòng điền đầy đủ thông tin!");
    }

    //handle Get One Staff
    const fetchOneStaff = async (userId) => {
        dispatch(setLoadingTrue());
        try {
            const response = await StaffManagementAPI.fetchOneStaff(userId);
            handleFillFieldsValue(response.data.data);
            dispatch(setLoadingFalse());
        } catch (e) {
            dispatch(setLoadingFalse());
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    //handle Fill Fields Value
    const handleFillFieldsValue = (data) => {
        form.setFieldsValue({
            code: data.code,
            name: data.name,
            cccd: data.cccd,
            email: data.email,
            phoneNumber: data.phone,
            address: data.address,
            gender: data.gender,
            birthDay: dayjs(data.birthDay, "YYYY-MM-DD"),
            role: data.role,
            areaId: data.areaId,
        })
    }

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
        <>
            <span onClick={() => {
                navigate(ROUTE_MANAGEMENT_STAFF)
            }} className='cursor-pointer flex items-center font-sans font-bold text-[20px]'>
                <FontAwesomeIcon icon={faBackward} className='text-[30px] mr-[10px]' />
                Quay lại
            </span>
            <p className='mt-[40px] mb-[20px] font-sans font-bold text-[20px]'>
                <FontAwesomeIcon icon={faAddressBook} className='text-[30px] mr-[5px]' />
                {id === undefined ? "Thêm Nhân Viên" : "Cập Nhật Nhân Viên"}
            </p>
            <div className='shadow-xl rounded-[5px]'>
                <Form
                    className='container mx-auto max-w-[1200px] my-[20px]'
                    form={form}
                    onFinish={handleAddOrUpdateStaff}
                    onFinishFailed={handleAddStaffFailed}
                >
                    {/*Row 1*/}
                    <Row className='mb-[20px]'>
                        <Col span={11} className='mr-[20px]'>
                            <Form.Item
                                label="Mã nhân viên"
                                name="code"
                                rules={[
                                    { required: true, message: "Mã nhân viên không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Tên nhân viên"
                                name="name"
                                rules={[
                                    { required: true, message: "Tên nhân viên không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 2*/}
                    <Row className='mb-[20px]'>
                        <Col span={11} className='mr-[20px]'>
                            <Form.Item
                                label="Căn cước công dân"
                                name="cccd"
                                rules={[
                                    { required: true, message: "Căn cước nhân viên không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Email nhân viên không được để trống!" },
                                    { type: "email", message: "Vui lòng nhập email hợp lệ!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 3*/}
                    <Row className='mb-[20px]'>
                        <Col span={11} className='mr-[20px]'>
                            <Form.Item
                                label="Ngày sinh"
                                name="birthDay"
                                rules={[
                                    { required: true, message: "Ngày sinh chưa được chọn!" }
                                ]}
                            >
                                <DatePicker allowClear format="YYYY-MM-DD" placeholder="Chọn ngày sinh" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[
                                    { required: true, message: "Số điện thoại không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 4*/}
                    <Row className='mb-[20px]'>
                        <Col span={11} className='mr-[20px]'>
                            <Form.Item
                                label="Địa Chỉ"
                                name="address"
                                rules={[
                                    { required: true, message: "Địa chỉ không được để trống!" }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[
                                    { required: true, message: "Giới tính chưa được chọn!" }
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={true}>Nam</Radio>
                                    <Radio value={false}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 5*/}
                    <Row className='mb-[20px]'>
                        <Col span={11} className='mr-[20px]'>
                            <Form.Item
                                label="Khu vực"
                                name="areaId"
                                rules={[
                                    { required: true, message: "Khu vực chưa được chọn!" }
                                ]}
                            >
                                <Select
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn khu vực"
                                    options={listArea.map(item => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Vai trò"
                                name="role"
                                rules={[
                                    { required: true, message: "Vai trò chưa được chọn!" }
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={ROLE_ADMIN}>Admin</Radio>
                                    <Radio value={ROLE_ADMIN_AREA}>Admin Area</Radio>
                                    <Radio value={ROLE_STAFF}>Staff</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Row 5*/}
                    <Row className='mb-[10px]'>
                        {id !== undefined ? "" :
                            <Col span={11} className='mr-[20px]'>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        { required: true, message: "Mật khẩu không được để trống!" }
                                    ]}
                                >
                                    <Input.Password allowClear />
                                </Form.Item>
                            </Col>
                        }
                        <Col span={11}>
                            {id === undefined
                                ?
                                <Form.Item
                                    label="Chọn ảnh"
                                    name="image"
                                    rules={[
                                        { required: true, message: "Bạn chưa chọn ảnh đại diện!" }
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
                        </Col>
                    </Row>
                    <div className='flex justify-end pb-[30px]'>
                        <Button type='primary' htmlType='submit'>{id === undefined ? "Thêm Nhân Viên" : "Cập Nhật Nhân Viên"}</Button>
                    </div>
                </Form>
            </div>
        </>
    )

}