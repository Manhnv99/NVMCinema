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
import { useDispatch, useSelector } from "react-redux";
import { HomePageAPI } from "../../apis/Client/HomePage/HomePageAPI";
import { setAreaChange, setListAreaGlobal, setTextAreaGlobal } from "../../app/Redux/Slice/AreaSlice";

export const ClientHeaderLayout = () => {

    //navigate
    const navigate = useNavigate();
    //dispatch
    const dispatch = useDispatch();
    //selector login status
    const loginStatus = useSelector(state => state.loading.statusLogin);
    const listAreaGlobal = useSelector(state => state.area.listAreaGlobal);
    const textAreaGlobal = useSelector(state => state.area.textAreaGlobal);
    //state
    const [userAuthen, setUserAuthen] = useState({});

    const handleChooseArea = (e, id) => {
        dispatch(setTextAreaGlobal(e.target.innerText));
        localStorage.setItem("area", id);
        dispatch(setAreaChange());
    };

    useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("area")) {
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

    useEffect(() => {
        HomePageAPI.fetchListArea().then(response => {
            dispatch(setListAreaGlobal(response.data.data));
        });
    }, []);

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
        <>
            {window.location.pathname !== ROUTE_CLIENT_ACCOUNT
                ?
                <div className="bg-[#0d0f13] text-[var(--primary-white)] h-[80px] border-b border-[#999] fixed top-0 left-0 right-0 z-[1000]">
                    <div className="container max-w-[90%] mx-auto h-full">
                        <div className="flex justify-between h-full py-[10px]">
                            <div className="flex items-center w-[50%] h-full">
                                <img onClick={() => {
                                    navigate(ROUTE_CLIENT_HOME); //chuyển đến trang chủ
                                }} src={LogoNVM} className="h-full rounded-[50%] cursor-pointer" />
                                <div className="flex ml-[30px]">
                                    <p className="cursor-pointer hover:text-[var(--primary-limegreen)] duration-[0.3s] font-bold text-[#cfcfd0] mr-[15px] mb-0">Lịch chiếu</p>
                                    <p className="cursor-pointer hover:text-[var(--primary-limegreen)] duration-[0.3s] font-bold text-[#cfcfd0] mr-[15px] mb-0">Hệ thống rạp</p>
                                    <p className="cursor-pointer hover:text-[var(--primary-limegreen)] duration-[0.3s] font-bold text-[#cfcfd0] mb-0">Khuyến mãi/Sự kiện</p>
                                </div>
                            </div>
                            <div className="w-[50%] flex items-center justify-end">
                                <p className="font-bold mr-[20px] cursor-pointer mb-0">Quy định</p>
                                <div className="group relative">
                                    <button className="font-semibold bg-transparent border border-[#999] outline-none
                                    py-[10px] px-[20px] rounded-md"
                                    >
                                        {textAreaGlobal} <DownOutlined className="text-[12px] ml-[5px]" />
                                    </button>
                                    <div className='hidden absolute group-hover:block bg-[#1f222a] py-[15px]
                                        rounded-md border border-[#999] w-[200px] right-0 top-[45px]'
                                    >
                                        {listAreaGlobal.map(item => {
                                            return (
                                                <>
                                                    <p style={{
                                                        backgroundColor: textAreaGlobal === item.name ? "var(--primary-limegreen)" : "",
                                                        color: textAreaGlobal === item.name ? "#FFF" : ""
                                                    }} onClick={(e) => {
                                                        handleChooseArea(e, item.id)
                                                    }} className="option_area py-[5px] px-[20px] hover:text-[var(--primary-limegreen)]
                                        transition duration-500 cursor-pointer">
                                                        {item.name}
                                                    </p>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="bg-[var(--primary-nvm)] text-[var(--primary-white)] h-[80px] border-b border-[#999]">
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
                                        {textAreaGlobal} <DownOutlined className="text-[12px] ml-[5px]" />
                                    </button>
                                    <div className='hidden absolute group-hover:block bg-[#1f222a] py-[15px]
                                                rounded-md border border-[#999] w-[200px] right-0 top-[45px]'
                                    >
                                        {listAreaGlobal.map(item => {
                                            return (
                                                <>
                                                    <p style={{
                                                        backgroundColor: textAreaGlobal === item.name ? "var(--primary-limegreen)" : "",
                                                        color: textAreaGlobal === item.name ? "#FFF" : ""
                                                    }} onClick={(e) => {
                                                        handleChooseArea(e, item.id)
                                                    }} className="option_area py-[5px] px-[20px] hover:text-[var(--primary-limegreen)]
                                        transition duration-500 cursor-pointer">
                                                        {item.name}
                                                    </p>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}