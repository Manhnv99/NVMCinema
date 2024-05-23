import { useEffect, useState } from "react";
import LogoNVM from "../../assets/NVM.png";
import { useNavigate } from "react-router-dom";
import { ROUTE_CLIENT_ACCOUNT, ROUTE_CLIENT_BRANCH_SYSTEM, ROUTE_CLIENT_HOME, ROUTE_CLIENT_INFORMATION, ROUTE_CLIENT_PROMOTION_EVENT } from "../../app/BaseUrl/BaseUrl";
import { ExtractInforToken } from "../../utils/Extract/ExtractInforToken";
import { TYPE_USER_CLIENT, TYPE_USER_USER } from "../../app/Constant/TypeUser";
import { Avatar, Dropdown, Menu, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HomePageAPI } from "../../apis/Client/HomePage/HomePageAPI";
import { setAreaChange, setListAreaGlobal } from "../../app/Redux/Slice/AreaSlice";
import { ACCESS_TOKEN, AREA_CLIENT, REFRESH_TOKEN } from "../../app/Constant/TokenConstant";

export const ClientHeaderLayout = () => {

    //navigate
    const navigate = useNavigate();
    //dispatch
    const dispatch = useDispatch();
    //selector login status
    const loginStatus = useSelector(state => state.loading.statusLogin);
    const listAreaGlobal = useSelector(state => state.area.listAreaGlobal);
    const areaChange = useSelector(state => state.area.areaChange);
    //state
    const [userAuthen, setUserAuthen] = useState({});
    const [currentArea, setCurrentArea] = useState("");

    const handleChooseArea = (value) => {
        localStorage.setItem(AREA_CLIENT, value);
        dispatch(setAreaChange());
    };

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN) && localStorage.getItem(AREA_CLIENT)) {
            const inforUser = ExtractInforToken();
            if (inforUser?.typeUser === undefined) {
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

    //Two-way-binding
    useEffect(() => {
        setCurrentArea(localStorage.getItem(AREA_CLIENT));
    }, [areaChange]);

    useEffect(() => {
        HomePageAPI.fetchListArea().then(response => {
            dispatch(setListAreaGlobal(response?.data?.data));
        });
    }, []);

    const items = [
        {
            label: 'Thông tin tài khoản',
            key: ROUTE_CLIENT_INFORMATION,
        },
        {
            label: 'Đăng xuất',
            key: ROUTE_CLIENT_ACCOUNT,
        },
    ];

    const handleItemClick = (e) => {
        if (e.key === ROUTE_CLIENT_INFORMATION) {
            navigate(ROUTE_CLIENT_INFORMATION)
        } else {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            navigate(ROUTE_CLIENT_ACCOUNT);
            message.success("Đăng xuất tài khoản thành công!")
        }
    }

    return (
        <>
            {window.location.pathname !== ROUTE_CLIENT_ACCOUNT
                ?
                <div className="bg-[#0d0f13] text-[var(--primary-white)] h-[80px] border-b border-[#999] fixed top-0 left-0 right-0 z-[1000]">
                    <div className="container max-w-[90%] mx-auto h-full">
                        <div className="flex justify-between h-full py-[10px]">
                            <div className="flex items-center w-[50%] h-full">
                                <img onClick={() => navigate(ROUTE_CLIENT_HOME)} src={LogoNVM} className="h-full rounded-[50%] cursor-pointer" />
                                <div className="flex ml-[30px]">
                                    <p onClick={() => navigate(ROUTE_CLIENT_HOME)} className="cursor-pointer hover:text-[var(--primary-limegreen)] duration-[0.3s] font-bold text-[#cfcfd0] mr-[15px] mb-0">Lịch chiếu</p>
                                    <p onClick={() => navigate(ROUTE_CLIENT_BRANCH_SYSTEM)} className="cursor-pointer hover:text-[var(--primary-limegreen)] duration-[0.3s] font-bold text-[#cfcfd0] mr-[15px] mb-0">Hệ thống rạp</p>
                                    <p onClick={() => navigate(ROUTE_CLIENT_PROMOTION_EVENT)} className="cursor-pointer hover:text-[var(--primary-limegreen)] duration-[0.3s] font-bold text-[#cfcfd0] mb-0">Khuyến mãi/Sự kiện</p>
                                </div>
                            </div>
                            <div className="w-[50%] flex items-center justify-end">
                                <p className="font-bold mr-[20px] cursor-pointer mb-0">Quy định</p>
                                <Select
                                    className="w-[130px] h-[40px]"
                                    style={{
                                        backgroundColor: "#000 !important"
                                    }}
                                    placeholder="Khu vực"
                                    value={currentArea}
                                    options={listAreaGlobal.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.name
                                        }
                                    })}
                                    onChange={handleChooseArea}
                                />
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
                </div >
                :
                <div className="bg-[var(--primary-nvm)] text-[var(--primary-white)] h-[80px] border-b border-[#999]">
                    <div className="container max-w-[90%] mx-auto h-full">
                        <div className="flex h-full py-[10px]">
                            <div className="flex justify-end w-[50%] h-full">
                                <img onClick={() => {
                                    if (localStorage.getItem(ACCESS_TOKEN)) {
                                        navigate(ROUTE_CLIENT_HOME); //chuyển đến trang chủ
                                    }
                                }} src={LogoNVM} className="h-full rounded-[50%] cursor-pointer" />
                            </div>
                            <div className="w-[50%] flex items-center justify-end">
                                <p className="font-bold mr-[20px] cursor-pointer">Quy định</p>
                                <Select
                                    className="text-[20px] w-[130px] h-[40px]"
                                    placeholder="Khu vực"
                                    value={currentArea}
                                    options={listAreaGlobal.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.name
                                        }
                                    })}
                                    onChange={handleChooseArea}
                                >
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}