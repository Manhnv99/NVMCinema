import { Table, Button, Tooltip, Tag, Pagination } from "antd"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLayerGroup, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import { useState } from "react";
import { ModalAddOrUpdate } from "./ModalAddOrUpdate";

export const TableComponent = () => {

    //openModal
    const [openModal, setOpenModal] = useState(false);

    //columns table
    const columns = [
        { title: "Mã Đạo Diễn", dataIndex: "code", key: "code" },
        { title: "Tên Đạo Diễn", dataIndex: "name", key: "name" },
        { title: "Tuổi", dataIndex: "age", key: "age" },
        {
            title: "Giới Tính", dataIndex: "gender", key: "gender",
            // render: (record) => record ? "Nam" : "Nữ"
        },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        {
            title: "Trạng Thái", dataIndex: "deleted", key: "deleted",
            // render: (record) => record ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="red">Ngưng hoạt động</Tag>
        },
        {
            title: "Thao Tác", key: "action",
            // render: (record) => {

            // }
        },
    ];

    return (
        <>
            {<ModalAddOrUpdate openModal={openModal} setOpenModal={setOpenModal} />}
            <div className="mt-[50px]">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-[20px] ">
                        <FontAwesomeIcon icon={faLayerGroup} className="mr-[10px]" />
                        Danh sách đạo diễn
                    </p>
                    <Button onClick={() => setOpenModal(true)} type="primary" className="h-[40px]">Thêm Đạo Diễn</Button>
                </div>
                <Table
                    className="mt-[10px]"
                    columns={columns}
                    scroll={{ x: "1300px" }}
                    // dataSource={state.listStaff}
                    pagination={false}
                >
                </Table>
                <Pagination onChange={(page) => {
                    // fetchListSearchStaff(state.searchValue, page);
                }}
                    pageSize={DEFAUTL_PAGE_SIZE}
                // total={}
                />
            </div>
        </>
    )

}