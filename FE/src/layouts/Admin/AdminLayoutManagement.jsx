import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, message } from 'antd';
import { useEffect, useState } from 'react';
import { ROUTE_CLIENT_HOME, ROUTE_LOGIN, ROUTE_MANAGEMENT_AREA, ROUTE_MANAGEMENT_BRANCH, ROUTE_MANAGEMENT_COUNTRY, ROUTE_MANAGEMENT_DIRECTOR, ROUTE_MANAGEMENT_FORMAT, ROUTE_MANAGEMENT_GENRE, ROUTE_MANAGEMENT_MOVIE, ROUTE_MANAGEMENT_ORDER, ROUTE_MANAGEMENT_PROMOTION, ROUTE_MANAGEMENT_ROOM, ROUTE_MANAGEMENT_SHOWTIME, ROUTE_MANAGEMENT_STAFF, ROUTE_MANAGEMENT_STATISTICS } from '../../app/BaseUrl/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import Logo from "../../assets/NVM.png";
import { ExtractInforToken } from '../../utils/Extract/ExtractInforToken';
import { TYPE_USER_CLIENT } from '../../app/Constant/TypeUser';
const { Header, Sider, Content } = Layout;

export const AdminLayoutManagement = ({ children }) => {

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


    const childrenMovie = [
        {
            key: ROUTE_MANAGEMENT_MOVIE,
            label: "Phim",
        },
        {
            key: ROUTE_MANAGEMENT_DIRECTOR,
            label: "Đạo Diễn",
        },
        {
            key: ROUTE_MANAGEMENT_FORMAT,
            label: "Phân Giải",
        },
        {
            key: ROUTE_MANAGEMENT_COUNTRY,
            label: "Quốc Gia",
        },
        {
            key: ROUTE_MANAGEMENT_GENRE,
            label: "Thể Loại",
        },
    ];

    const childrenArea = [
        {
            key: ROUTE_MANAGEMENT_AREA,
            label: "Khu Vực",
        },
        {
            key: ROUTE_MANAGEMENT_BRANCH,
            label: "Chi Nhánh",
        },
        {
            key: ROUTE_MANAGEMENT_ROOM,
            label: "Phòng Chiếu",
        }
    ];

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
                            key: ROUTE_MANAGEMENT_STATISTICS,
                            icon: <UserOutlined />,
                            label: 'Thống kê',
                        },
                        {
                            key: ROUTE_MANAGEMENT_ORDER,
                            icon: <VideoCameraOutlined />,
                            label: 'Hóa Đơn',
                        },
                        {
                            key: 'parentArea',
                            icon: <UploadOutlined />,
                            label: 'Quản Lý Khu Vực',
                            children: childrenArea
                        },
                        {
                            key: 'parentMovie',
                            icon: <UploadOutlined />,
                            label: 'Quản Lý Phim',
                            children: childrenMovie
                        },
                        {
                            key: ROUTE_MANAGEMENT_SHOWTIME,
                            icon: <UploadOutlined />,
                            label: 'Xuất Chiếu',
                        },
                        {
                            key: ROUTE_MANAGEMENT_STAFF,
                            icon: <UploadOutlined />,
                            label: 'Nhân Viên',
                        },
                        {
                            key: ROUTE_MANAGEMENT_PROMOTION,
                            icon: <UploadOutlined />,
                            label: 'Khuyến Mãi',
                        },
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
                        padding: 24,
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