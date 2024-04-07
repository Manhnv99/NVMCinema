import { Form, Input, Button, message } from "antd"
import { useLogin } from "./hooks/useLogin";

export const Login = () => {

    //use Form
    const [form] = Form.useForm();
    //custom Hooks
    const { handleRequestLoginAPI } = useLogin();

    const handleLogin = () => {
        handleRequestLoginAPI(form.getFieldsValue());
    }

    const handleLoginFailed = () => {
        message.error("Vui lòng nhập đủ tài khoản mật khẩu!");
    }

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