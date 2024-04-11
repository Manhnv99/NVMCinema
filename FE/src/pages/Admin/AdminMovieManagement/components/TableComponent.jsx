import { Card, Button, Table, Pagination, Tooltip } from "antd";
import { FontAwesomeIcon, faPenToSquare, faEye, faTrash } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

export const TableComponent = () => {

    const columns = [
        { title: "Banner", dataIndex: "bannerUrl", key: "bannerUrl" },
        { title: "Tên Phim", dataIndex: "name", key: "name" },
        { title: "Đạo Diễn", dataIndex: "director", key: "director" },
        { title: "Diễn Viên Nổi Bật", dataIndex: "actor", key: "actor" },
        { title: "Thể Loại", dataIndex: "genre", key: "genre" },
        { title: "Đất Nước", dataIndex: "country", key: "country" },
        { title: "Phân Giải", dataIndex: "format", key: "format" },
        { title: "Phụ Đề", dataIndex: "subTitle", key: "subTitle" },
        { title: "Thời Lượng", dataIndex: "duration", key: "duration" },
        { title: "Ngày Công Chiếu", dataIndex: "releaseDate", key: "releaseDate" },
        { title: "Trạng Thái", dataIndex: "deleted", key: "deleted" },
        {
            title: "Thao Tác",
            render: (record) => {
                return (
                    <div className="cursor-pointer text-[16px]">
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button style={{ backgroundColor: "#030405", color: "#fff" }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết" className="mx-[10px]">
                            <Button>
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                        </Tooltip>
                        <Tooltip title={record.status ? "Xóa phim" : "Hoạt động lại"} color="red">
                            <Button onClick={() => {
                                Swal.fire({
                                    title: "Bạn có chắc muốn thay đổi trạng thái của bộ phim này ?",
                                    icon: "question",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                }).then(result => {

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

    return (
        <>
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
                    scroll={{
                        x: "2000px"
                    }}
                >

                </Table>
                <Pagination />
            </Card>
        </>
    )
}