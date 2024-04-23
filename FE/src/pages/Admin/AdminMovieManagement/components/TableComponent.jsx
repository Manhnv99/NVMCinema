import { Card, Button, Table, Pagination, Tooltip, Image, Tag } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPenToSquare, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ROUTE_MANAGEMENT_MOVIE_ADD } from "../../../../app/BaseUrl/BaseUrl";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../store/context/context";
import { useMovie } from "../hooks/useMovie";
import { ModalDetailMovie } from "./ModalDetailMovie";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";

export const TableComponent = () => {

    //useNav
    const navigate = useNavigate();
    //custom hooks
    const { handleFetchListSearchMovie, handleFetchDeleteMovie } = useMovie();
    //useContext
    const [state, dispatch] = useContext(MovieContext);
    const [movieId, setMovieId] = useState("");
    //open Modal
    const [openModaDetail, setOpenModalDetail] = useState(false);

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
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button style={{ backgroundColor: "#030405", color: "#fff" }} onClick={() => {
                                navigate(`/management-movie/update/${record.id}`)
                            }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button onClick={() => {
                                setMovieId(record.id);
                                setOpenModalDetail(true);
                            }}>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={record.deleted ? "Xóa phim" : "Hoạt động lại"} color="red">
                            <Button onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn thay đổi trạng thái của bộ phim này ?",
                                    icon: "question",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {
                                    console.log(record.id);
                                    if (result.isConfirmed) {
                                        handleFetchDeleteMovie(record.id);
                                    }
                                })
                            }} style={{ backgroundColor: "red", color: "#fff" }}>
                                <FontAwesomeIcon icon={faTrash} />
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
            {<ModalDetailMovie openModal={openModaDetail} setOpenModal={setOpenModalDetail} movieId={movieId} key={"ModalDetailMovie"} />}
            <div className="mt-[25px] shadow-xl">
                <Card
                    title={
                        <span className="text-[18px]">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-[23px] mr-[5px]" />
                            Danh sách phim
                        </span>
                    }
                    extra={
                        <Button type="primary" className="h-[40px] text-[15px]" onClick={() => {
                            navigate(ROUTE_MANAGEMENT_MOVIE_ADD)
                        }}>
                            <FontAwesomeIcon icon={faPlus} className="mr-[5px]" />
                            Thêm bộ phim
                        </Button>
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