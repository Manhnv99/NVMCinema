import { Card, Button, Table, Pagination, Tooltip, Image, Tag } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { SaleCounterContext } from "../store/context/context";
import { useSaleCounter } from "../hooks/useSaleCounter";

export const TableComponent = () => {

    //useNav
    const navigate = useNavigate();
    //custom hooks
    const {
        handleFetchListSearchMovie
    } = useSaleCounter();
    //useContext
    const [state, dispatch] = useContext(SaleCounterContext);

    //columns for Table
    const columns = [
        {
            title: "Banner", dataIndex: "bannerUrl", key: "bannerUrl",
            render: (bannerUrl) => (
                <Image
                    className="rounded-[5px]"
                    width={200}
                    height={100}
                    style={{ objectFit: "cover" }}
                    src={bannerUrl}
                />
            )
        },
        { title: "Tên Phim", dataIndex: "name", key: "name" },
        { title: "Đạo Diễn", dataIndex: "director", key: "director" },
        { title: "Diễn Viên Nổi Bật", dataIndex: "actor", key: "actor" },
        { title: "Thể Loại", dataIndex: "genre", key: "genre" },
        { title: "Đất Nước", dataIndex: "country", key: "country" },
        { title: "Phân Giải", dataIndex: "format", key: "format" },
        { title: "Phụ Đề", dataIndex: "subTitle", key: "subTitle" },
        { title: "Thời Lượng", dataIndex: "duration", key: "duration" },
        { title: "Ngày Công Chiếu", dataIndex: "releaseDate", key: "releaseDate" },
        {
            title: "Trạng Thái", dataIndex: "deleted", key: "deleted",
            render: (deleted) => {
                if (deleted) {
                    return (
                        <Tag color="green">Đang hoạt động</Tag>
                    )
                } else {
                    return (
                        <Tag color="red">Ngưng hoạt động</Tag>
                    )
                }
            }
        },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Mua vé" color="green">
                            <Button style={{ backgroundColor: "green", color: "#fff" }} onClick={() => {
                                navigate(`/staff/management-sale-counter/dat-ve/${record.id}`)
                            }}>
                                <FontAwesomeIcon icon={faTicket} />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        },
    ];


    useEffect(() => {
        let inforSearch = { ...state.inforSearch };
        handleFetchListSearchMovie(
            inforSearch.name,
            inforSearch.director,
            inforSearch.genre,
            inforSearch.format,
            inforSearch.country,
            1
        );
    }, [state.inforSearch]);

    return (
        <>
            <div className="mt-[50px] shadow-xl">
                <Card
                    title={
                        <span className="text-[18px]">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-[23px] mr-[5px]" />
                            Danh sách phim
                        </span>
                    }
                >
                    <Table
                        columns={columns}
                        dataSource={state.inforListMovie.listMovie}
                        scroll={{
                            x: "2000px"
                        }}
                        pagination={false}
                    >

                    </Table>
                    <Pagination onChange={(page) => {
                        handleFetchListSearchMovie(
                            state.inforSearch.name,
                            state.inforSearch.director,
                            state.inforSearch.genre,
                            state.inforSearch.format,
                            state.inforSearch.country,
                            page
                        );
                    }} pageSize={DEFAUTL_PAGE_SIZE} total={state.inforListMovie.totalElement} />
                </Card>
            </div>
        </>
    )
}