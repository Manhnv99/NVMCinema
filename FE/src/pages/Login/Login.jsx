import { Form, Input, Button, message } from "antd"
import { useLogin } from "./hooks/useLogin";
import { useEffect } from "react";
import { ExtractInforToken } from "../../utils/Extract/ExtractInforToken";
import { TYPE_USER_CLIENT, TYPE_USER_USER } from "../../app/Constant/TypeUser";
import { useNavigate } from "react-router-dom";
import { ROUTE_ADMIN_MANAGEMENT_WELCOME, ROUTE_CLIENT_HOME } from "../../app/BaseUrl/BaseUrl";

export const Login = () => {

    //use Form
    const [form] = Form.useForm();
    //custom Hooks
    const { handleRequestLoginAPI } = useLogin();
    //useNav
    const navigate = useNavigate();

    //handle
    const handleLogin = () => {
        handleRequestLoginAPI(form.getFieldsValue());
    }

    const handleLoginFailed = () => {
        message.error("Vui lòng nhập đủ tài khoản mật khẩu!");
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const inforToken = ExtractInforToken();
            if (inforToken && inforToken.typeUser) {
                if (inforToken.typeUser === TYPE_USER_CLIENT) {
                    navigate(ROUTE_CLIENT_HOME);
                } else if (inforToken.typeUser === TYPE_USER_USER) {
                    navigate(ROUTE_ADMIN_MANAGEMENT_WELCOME);
                }
            }
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <Form
                form={form}
                name="basic"
                onFinish={handleLogin}
                onFinishFailed={handleLoginFailed}
                autoComplete="off"
            >
                <Form.Item
                    name={"email"}
                    label={"Email:"}
                    rules={[
                        { required: true, message: "Email không được để trống!" }
                    ]}
                >
                    <Input
                        style={{
                            width: "300px"
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={"password"}
                    label={"Password:"}
                    rules={[
                        { required: true, message: "Mật khẩu không được để trống!" }
                    ]}
                >
                    <Input.Password
                        style={{
                            width: "300px"
                        }}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">Đăng nhập</Button>
            </Form>
        </div>
    )
}