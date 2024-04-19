import { useEffect, useState } from "react";
import LogoNVM from "../../assets/NVM.png";
import {
    DownOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { ROUTE_CLIENT_ACCOUNT, ROUTE_CLIENT_HOME } from "../../app/BaseUrl/BaseUrl";
import { ExtractInforToken } from "../../utils/Extract/ExtractInforToken";
import { TYPE_USER_CLIENT, TYPE_USER_USER } from "../../app/Constant/TypeUser";
import { Avatar, Dropdown, Menu, message } from "antd";
import { useSelector } from "react-redux";

export const ClientHeaderLayout = () => {

    //navigate
    const navigate = useNavigate();
    //selector login status
    const loginStatus = useSelector(state => state.loading.statusLogin);
    //state
    const [textArea, setTextArea] = useState("Khu vực");
    const [userAuthen, setUserAuthen] = useState({});

    const handleChooseArea = (e) => {
        setTextArea(e.target.innerText);
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const inforUser = ExtractInforToken();
            if (inforUser.typeUser === undefined) {
                navigate(ROUTE_CLIENT_ACCOUNT);
            } else {
                setUserAuthen(inforUser);
                //nếu là đang ở trang đăng nhập mà có token và type token là client thì sẽ chuyển tới trang HOME
                if (window.location.pathname === ROUTE_CLIENT_ACCOUNT && inforUser.typeUser === TYPE_USER_CLIENT) {
                    navigate(ROUTE_CLIENT_HOME);
                } else if (inforUser.typeUser === TYPE_USER_USER) {
                    navigate(ROUTE_CLIENT_ACCOUNT);
                }
            }
        } else {
            navigate(ROUTE_CLIENT_ACCOUNT);
        }
    }, [loginStatus]);

    const items = [
        {
            label: 'Đăng xuất',
            key: 'dang_xuat',
        },
    ];

    const handleItemClick = () => {
        localStorage.removeItem("token");
        navigate(ROUTE_CLIENT_ACCOUNT);
        message.success("Đăng xuất tài khoản thành công!")
    }

    return (
        <div className="bg-[var(--primary-nvm)] text-[var(--primary-white)] h-[100px] border-b border-[#999]">
            <div className="container max-w-[90%] mx-auto h-full">
                <div className="flex h-full py-[10px]">
                    <div className="flex justify-end w-[50%] h-full">
                        <img onClick={() => {
                            navigate(ROUTE_CLIENT_HOME); //chuyển đến trang chủ
                        }} src={LogoNVM} className="h-full rounded-[50%] cursor-pointer" />
                    </div>
                    <div className="w-[50%] flex items-center justify-end">
                        <p className="font-bold mr-[20px] cursor-pointer">Quy định</p>
                        <div className="group relative">
                            <button className="font-semibold bg-transparent border border-[#999] outline-none
                            py-[10px] px-[20px] rounded-md"
                            >
                                {textArea} <DownOutlined className="text-[12px] ml-[5px]" />
                            </button>
                            <div className='hidden absolute group-hover:block bg-[#1f222a] py-[15px]
                                rounded-md border border-[#999] w-[200px] right-0 top-[45px]'
                            >
                                <p style={{
                                    backgroundColor: textArea === "TP.HCM" ? "var(--primary-limegreen)" : "",
                                    color: textArea === "TP.HCM" ? "#FFF" : ""
                                }} onClick={handleChooseArea} className="option_area py-[5px] px-[20px] hover:text-[var(--primary-limegreen)]
                                transition duration-500 cursor-pointer">
                                    TP.HCM
                                </p>
                                <p style={{
                                    backgroundColor: textArea === "Hà Nội" ? "var(--primary-limegreen)" : "",
                                    color: textArea === "Hà Nội" ? "#FFF" : ""
                                }} onClick={handleChooseArea} className="option_area py-[5px] px-[20px] hover:text-[var(--primary-limegreen)]
                                transition duration-500 cursor-pointer">Hà Nội</p>
                                <p style={{
                                    backgroundColor: textArea === "Huế" ? "var(--primary-limegreen)" : "",
                                    color: textArea === "Huế" ? "#FFF" : ""
                                }} onClick={handleChooseArea} className="option_area py-[5px] px-[20px] hover:text-[var(--primary-limegreen)]
                                transition duration-500 cursor-pointer">Huế</p>
                                <p style={{
                                    backgroundColor: textArea === "Đà Nẵng" ? "var(--primary-limegreen)" : "",
                                    color: textArea === "Đà Nẵng" ? "#FFF" : ""
                                }} onClick={handleChooseArea} className="option_area py-[5px] px-[20px] hover:text-[var(--primary-limegreen)]
                                transition duration-500 cursor-pointer">Đà Nẵng</p>
                            </div>
                        </div>
                        {window.location.pathname !== ROUTE_CLIENT_ACCOUNT
                            ?
                            <>
                                <div className='ml-[10px]'>
                                    <span className="font-medium text-[16px] mr-[10px]">{userAuthen.fullName}</span>
                                    <Dropdown
                                        className='cursor-pointer'
                                        overlay={<Menu onClick={handleItemClick} items={items} />}
                                        trigger={['click']}
                                    >
                                        <Avatar
                                            style={{
                                                height: "50px",
                                                width: "50px",
                                                border: "1px solid #FFF"
                                            }}
                                            src={userAuthen.image}
                                        />
                                    </Dropdown>
                                </div>
                            </>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}