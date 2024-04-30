import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import Logo from "../../assets/NVM.png";
import { ExtractInforToken } from '../../utils/Extract/ExtractInforToken';
import { TYPE_USER_CLIENT } from '../../app/Constant/TypeUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTicket } from '@fortawesome/free-solid-svg-icons';
import {
    ROUTE_CLIENT_HOME,
    ROUTE_LOGIN,
    ROUTE_STAFF_MANAGEMENT_ORDER,
    ROUTE_STAFF_MANAGEMENT_SALE_COUNTER
} from '../../app/BaseUrl/BaseUrl';
const { Header, Sider, Content } = Layout;

export const StaffLayoutManagement = ({ children }) => {

    //constant
    const URL_BOOK_CHAIR = "/staff/management-sale-counter/dat-cho-ngoi";
    const URL_BOOK_TICKET = "/staff/management-sale-counter/dat-ve";
    //useNavigate
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [userAuthen, setUserAuthen] = useState({});

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const inforToken = ExtractInforToken();
            setUserAuthen(inforToken);
            if (inforToken && inforToken.typeUser) {
                if (inforToken.typeUser === TYPE_USER_CLIENT) {
                    navigate(ROUTE_CLIENT_HOME);
                }
            } else {
                navigate(ROUTE_LOGIN);
            }
        } else {
            navigate(ROUTE_LOGIN);
        }
    }, []);

    const items = [
        {
            label: 'Đăng xuất',
            key: 'dang_xuat',
        },
    ];

    const handleItemClick = () => {
        localStorage.removeItem("token");
        navigate(ROUTE_LOGIN);
        message.success("Đăng xuất tài khoản thành công!")
    }


    const handleRedirectRoute = (route) => {
        navigate(route.key);
    }

    return (
        <Layout style={{
            minHeight: "100vh"
        }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='text-center'>
                    <Avatar
                        style={{
                            width: "90%",
                            height: "auto"
                        }}
                        src={Logo}
                    />
                </div>
                <Menu
                    onClick={handleRedirectRoute}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: ROUTE_STAFF_MANAGEMENT_SALE_COUNTER,
                            icon: <FontAwesomeIcon icon={faTicket} />,
                            label: 'Bán Tại Quầy',
                        },
                        {
                            key: ROUTE_STAFF_MANAGEMENT_ORDER,
                            icon: <FontAwesomeIcon icon={faMoneyBill} />,
                            label: 'Hóa Đơn',
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: "0",
                        background: colorBgContainer,
                    }}
                    className='flex items-center justify-between'
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='pr-[20px]'>
                        <span className="font-medium text-[16px] mr-[10px]">{userAuthen.userFullName}</span>
                        <Dropdown
                            className='cursor-pointer'
                            overlay={<Menu onClick={handleItemClick} items={items} />}
                            trigger={['click']}
                        >
                            <Avatar
                                style={{
                                    height: "45px",
                                    width: "45px"
                                }}
                                src={userAuthen.userImage}
                            />
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: window.location.pathname.includes(URL_BOOK_CHAIR) || window.location.pathname.includes(URL_BOOK_TICKET) ? 0 : 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}