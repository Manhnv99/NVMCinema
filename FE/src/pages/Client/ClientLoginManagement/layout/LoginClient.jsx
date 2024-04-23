import { Image, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { ROUTE_CLIENT_HOME } from "../../../../app/BaseUrl/BaseUrl";
import { useDispatch } from "react-redux";
import { setStatusLogin } from "../../../../app/Redux/Slice/LoadingSlice";
import { ModalChooseArea } from "../components/ModalChooseArea";
import { isAreaExistInLocalStore } from "../../../../utils/CheckInforLocalStore/CheckInforLocalStore";


export const LoginClient = () => {

    //dispatch
    const dispatch = useDispatch();
    //navigate
    const navigate = useNavigate();
    //upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    //state
    const [whatAction, setWhatAction] = useState(true);
    //openModal
    const [openModalChooseArea, setOpenModalChooseArea] = useState(false);
    //custom hooks
    const {
        handleFetchLogin,
        handleFetchRegister,
        provinces
    } = useAuthentication();
    //obj
    const [registerRequest, setRegisterRequest] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        birthDay: "",
        password: "",
        authPassword: "",
        province: "",
        addressDetail: "",
        image: ""
    });
    const [loginRequest, setLoginRequest] = useState({
        email: "",
        password: ""
    });

    //handle Function
    const handleChageWhatAction = () => {
        if (whatAction) {
            setLoginRequest({
                email: "",
                password: ""
            });
        } else {
            setRegisterRequest({
                name: "",
                email: "",
                phoneNumber: "",
                birthDay: "",
                password: "",
                authPassword: "",
                province: "",
                addressDetail: "",
                image: ""
            });
        }
        setWhatAction(!whatAction);
    }


    useEffect(() => {
        if (!isAreaExistInLocalStore()) {
            setOpenModalChooseArea(true);
        }
    }, []);

    //handlelogin
    const handleLogin = () => {
        if (isAreaExistInLocalStore()) {
            handleFetchLogin(loginRequest).then(response => {
                localStorage.setItem("token", response.data.token);
                message.success(response.data.message);
                dispatch(setStatusLogin());
                navigate(ROUTE_CLIENT_HOME);
            });
        } else {
            setOpenModalChooseArea(true);
        }
    };

    //handleRegister
    const handleRegister = () => {
        if (isObjectEmpty(registerRequest)) {
            message.warning("Vui lòng điền đủ thông tin");
        } else {
            const postAuthen = new FormData();
            postAuthen.append("name", registerRequest.name);
            postAuthen.append("email", registerRequest.email);
            postAuthen.append("phoneNumber", registerRequest.phoneNumber);
            postAuthen.append("birthDay", registerRequest.birthDay);
            postAuthen.append("password", registerRequest.password);
            postAuthen.append("authPassword", registerRequest.authPassword);
            postAuthen.append("province", registerRequest.province);
            postAuthen.append("addressDetail", registerRequest.addressDetail);
            postAuthen.append("image", registerRequest.image);
            //call API post
            handleFetchRegister(postAuthen).then(response => {
                message.success(response.data.message);
                setWhatAction(true);
            });
        }
    }

    const isObjectEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && (obj[key] === "")) {
                return true;
            }
        }
        return false;
    };

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

    //onChange
    const onChangeFieldsRegister = (e, field) => {
        setRegisterRequest({
            ...registerRequest,
            [field]: e.target.value
        });
    };
    const onChangeFieldsLogin = (e, field) => {
        setLoginRequest({
            ...loginRequest,
            [field]: e.target.value
        });
    }

    return (
        <>
            {<ModalChooseArea openModal={openModalChooseArea} setOpenModal={setOpenModalChooseArea} />}
            <div className="bg-[#1a1d29] text-[#222] flex justify-center">
                <div className="w-[800px] my-[50px]">
                    <div className="grid grid-cols-2">
                        <div onClick={handleChageWhatAction} style={{
                            backgroundColor: whatAction ? "#f8fafc" : "",
                            color: whatAction ? "#222" : "#FFF",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px"
                        }} className="col-span-1 h-[40px] flex items-center justify-center font-bold
                        text-[18px] cursor-pointer"
                        >
                            Đăng nhập
                        </div>
                        <div onClick={handleChageWhatAction} style={{
                            backgroundColor: whatAction === false ? "#f8fafc" : "",
                            color: whatAction === false ? "#222" : "#FFF",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px"
                        }} className="col-span-1 h-[40px] flex items-center justify-center font-bold
                        text-[18px] cursor-pointer">
                            Đăng ký
                        </div>
                        <div className="col-span-2 bg-[#f8fafc] pt-[50px] pb-[20px] px-[40px]">
                            {whatAction
                                ?
                                //login
                                <div className="grid grid-cols-1">
                                    <div>
                                        <span className="font-medium text-[#222c37]">Tài khoản</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsLogin(e, "email");
                                        }} value={loginRequest.email} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập tên tài khoản...." />
                                    </div>
                                    <div>
                                        <span className="font-medium text-[#222c37]">Mật khẩu</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsLogin(e, "password");
                                        }} value={loginRequest.password} type="password" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập mật khẩu...." />
                                    </div>
                                    <div className="text-center my-[30px]">
                                        <div className="flex justify-end">
                                            <span className="border-[#222] border-b-2 mb-[10px] cursor-pointer">Quên mật khẩu?</span>
                                        </div>
                                        <button onClick={handleLogin}
                                            className="bg-[#f3ea28] outline-none font-bold w-full py-[10px] text-[18px] rounded-md"
                                        >Đăng nhập</button>
                                    </div>
                                </div>
                                :
                                //register
                                <div className="grid grid-cols-1">
                                    <div>
                                        <span className="font-medium text-[#222c37]">Email</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsRegister(e, "email");
                                        }} value={registerRequest.email} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập email...." />
                                    </div>
                                    {/*  */}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Họ Và Tên</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsRegister(e, "name");
                                        }} value={registerRequest.name} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập họ và tên...." />
                                    </div>
                                    {/*  */}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Số Điện Thoại</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsRegister(e, "phoneNumber");
                                        }} value={registerRequest.phoneNumber} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập số điện thoại...." />
                                    </div>
                                    {/*  */}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Ngày Sinh</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsRegister(e, "birthDay");
                                        }} value={registerRequest.birthDay} type="date" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Chọn ngày sinh...." />
                                    </div>
                                    {/*  */}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Thành Phố</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <select onChange={(e) => {
                                            onChangeFieldsRegister(e, "province");
                                        }} value={registerRequest.province} className="my-[10px] border border-[#e2e8f0]
                                            outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full">
                                            <option value="">--Chọn thành phố--</option>
                                            {provinces.map(item => {
                                                return (
                                                    <option key={item.id} value={item.name}>{item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    {/*  */}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Địa chỉ</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsRegister(e, "addressDetail");
                                        }} value={registerRequest.addressDetail} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập địa chỉ...." />
                                    </div>
                                    {/*  */}
                                    {/*  */}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Chọn Ảnh</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <Upload
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            listType="picture-card"
                                            maxCount={1}
                                            onPreview={handlePreview}
                                            onChange={(e) => {
                                                setRegisterRequest({
                                                    ...registerRequest,
                                                    image: e.file.originFileObj
                                                });
                                            }}
                                        >
                                            Upload
                                        </Upload>
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
                                    </div>
                                    {/*Mật khẩu*/}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Mật khẩu</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsRegister(e, "password");
                                        }} value={registerRequest.password} type="password" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập mật khẩu...." />
                                    </div>
                                    {/*Xác thực mật khẩu*/}
                                    <div>
                                        <span className="font-medium text-[#222c37]">Xác Thực Mật khẩu</span>
                                        <span className="text-[red]">*</span>
                                        <br />
                                        <input onChange={(e) => {
                                            onChangeFieldsRegister(e, "authPassword");
                                        }} value={registerRequest.authPassword} type="password" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập mật khẩu xác thực...." />
                                    </div>
                                    {/*Quên mật khẩu*/}
                                    <div className="text-center my-[30px]">
                                        <div className="flex justify-end">
                                            <span className="border-[#222] border-b-2 mb-[10px] cursor-pointer">Quên mật khẩu?</span>
                                        </div>
                                        <button onClick={handleRegister}
                                            className="bg-[#f3ea28] outline-none font-bold w-full py-[10px] text-[18px] rounded-md"
                                        >Đăng ký</button>
                                        <div className="text-[15px] mt-[20px]">
                                            <span>Bạn đã có tài khoản? </span>
                                            <span className="font-medium border-b-2 border-[#222] cursor-pointer">Đăng nhập</span>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};