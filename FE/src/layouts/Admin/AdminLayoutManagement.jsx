import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, message } from 'antd';
import { useEffect, useState } from 'react';
import { ROUTE_ADMIN_MANAGEMENT_AREA, ROUTE_ADMIN_MANAGEMENT_BRANCH, ROUTE_ADMIN_MANAGEMENT_COMBO_FOOD, ROUTE_ADMIN_MANAGEMENT_COUNTRY, ROUTE_ADMIN_MANAGEMENT_DIRECTOR, ROUTE_ADMIN_MANAGEMENT_FORMAT, ROUTE_ADMIN_MANAGEMENT_GENRE, ROUTE_ADMIN_MANAGEMENT_MOVIE, ROUTE_ADMIN_MANAGEMENT_ORDER, ROUTE_ADMIN_MANAGEMENT_PROMOTION, ROUTE_ADMIN_MANAGEMENT_ROOM, ROUTE_ADMIN_MANAGEMENT_SHOWTIME, ROUTE_ADMIN_MANAGEMENT_STAFF, ROUTE_ADMIN_MANAGEMENT_STATISTICS, ROUTE_CLIENT_HOME, ROUTE_LOGIN} from '../../app/BaseUrl/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import Logo from "../../assets/NVM.png";
import { ExtractInforToken } from '../../utils/Extract/ExtractInforToken';
import { TYPE_USER_CLIENT } from '../../app/Constant/TypeUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faChartArea, faChartSimple, faFilm, faMoneyBills, faTags, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';
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
            key: ROUTE_ADMIN_MANAGEMENT_MOVIE,
            label: "Phim",
        },
        {
            key: ROUTE_ADMIN_MANAGEMENT_DIRECTOR,
            label: "Đạo Diễn",
        },
        {
            key: ROUTE_ADMIN_MANAGEMENT_FORMAT,
            label: "Phân Giải",
        },
        {
            key: ROUTE_ADMIN_MANAGEMENT_COUNTRY,
            label: "Quốc Gia",
        },
        {
            key: ROUTE_ADMIN_MANAGEMENT_GENRE,
            label: "Thể Loại",
        },
    ];

    const childrenArea = [
        {
            key: ROUTE_ADMIN_MANAGEMENT_AREA,
            label: "Khu Vực",
        },
        {
            key: ROUTE_ADMIN_MANAGEMENT_BRANCH,
            label: "Chi Nhánh",
        },
        {
            key: ROUTE_ADMIN_MANAGEMENT_ROOM,
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
                            key: ROUTE_ADMIN_MANAGEMENT_STATISTICS,
                            icon: <FontAwesomeIcon icon={faChartSimple} />,
                            label: 'Thống kê',
                        },
                        {
                            key: ROUTE_ADMIN_MANAGEMENT_ORDER,
                            icon: <FontAwesomeIcon icon={faMoneyBills} />,
                            label: 'Hóa Đơn',
                        },
                        {
                            key: 'parentArea',
                            icon: <FontAwesomeIcon icon={faChartArea} />,
                            label: 'Quản Lý Khu Vực',
                            children: childrenArea
                        },
                        {
                            key: 'parentMovie',
                            icon: <FontAwesomeIcon icon={faFilm} />,
                            label: 'Quản Lý Phim',
                            children: childrenMovie
                        },
                        {
                            key: ROUTE_ADMIN_MANAGEMENT_SHOWTIME,
                            icon: <FontAwesomeIcon icon={faVideo} />,
                            label: 'Xuất Chiếu',
                        },
                        {
                            key: ROUTE_ADMIN_MANAGEMENT_STAFF,
                            icon: <FontAwesomeIcon icon={faUsers} />,
                            label: 'Nhân Viên',
                        },
                        {
                            key: ROUTE_ADMIN_MANAGEMENT_PROMOTION,
                            icon: <FontAwesomeIcon icon={faTags} />,
                            label: 'Khuyến Mãi',
                        },
                        {
                            key: ROUTE_ADMIN_MANAGEMENT_COMBO_FOOD,
                            icon: <FontAwesomeIcon icon={faBurger} />,
                            label: 'ComboFood',
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