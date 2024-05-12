import { Card, DatePicker, Image, Pagination, Table, Upload, message } from "antd"
import { useInformation } from "../hooks/useInformation";
import { useState } from "react";
import { useEffect } from "react";
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken";
import { ModalPayment } from "../components/ModalPayment";
import Swal from "sweetalert2";
import { DEFAUTL_PAGE_SIZE } from "../../../../app/Constant/PaginationConstant";
import dayjs from "dayjs";
import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";

export const InformationClient = () => {

    //custom hooks
    const {
        provinces,
        handleFetchClientDetail,
        handleFetchPutClient, putSuccess,
        handleFetchTransactionHistory, listTransactionHistory, totalPages
    } = useInformation();
    //upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    //userToken
    const [userToken, setUserToken] = useState({});
    const [clientImage, setClientImage] = useState("");
    const [putClientRequest, setPutClientRequest] = useState({
        name: "",
        email: "",
        phone: "",
        birthDay: "",
        province: "",
        address: "",
        password: "",
        image: new File([], "emptyFile")
    });
    //date Transaction
    const [dateTransaction, setDateTransaction] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    //openModal
    const [openModalPayment, setOpenModalPayment] = useState(false);
    const [paramsPayment, setParamsPayment] = useState({
        code: "",
        totalPrice: 0
    });

    //columns table
    const columnsTable = [
        {
            title: "Ảnh phim", dataIndex: "movieImage", key: "movieImage", width: "10%",
            render: (movieImage) => (
                <Image src={movieImage} style={{
                    borderRadius: "5px",
                    width: "200px",
                    height: "100px",
                    objectFit: "cover"
                }} />
            )
        },
        { title: "Mã lấy vé", dataIndex: "code", key: "code", width: "10%", },
        { title: "Phim", dataIndex: "movie", key: "movie", width: "15%", },
        { title: "Rạp chiếu", dataIndex: "branch", key: "branch", width: "25%", },
        {
            title: "Xuất chiếu", dataIndex: "showTime", key: "showTime", width: "10%",
            render: (showTime) => (
                dayjs(showTime).format("YYYY-MM-DD HH:mm")
            )
        },
        { title: "Vị trí ghế", dataIndex: "chair", key: "chair", width: "5%", },
        {
            title: "Đồ ăn", dataIndex: "food", key: "food", width: "10%",
            render: (food) => food ? food : "Không"
        },
        {
            title: "Ưu đãi", dataIndex: "promotion", key: "promotion", width: "5%",
            render: (promotion) => {
                if (promotion) {
                    return ConvertCurrencyVND(promotion)
                } else {
                    return "0VNĐ"
                }
            }
        },
        {
            title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice", width: "10%",
            render: (totalPrice) => (
                ConvertCurrencyVND(totalPrice)
            )
        },
    ];

    //Fetch Detail Client
    useEffect(() => {
        const userToken = ExtractInforToken();
        setUserToken(userToken);
        handleFetchClientDetail(userToken.id).then(data => {
            setClientImage(data.imageUrl);
            setPutClientRequest({
                name: data.name,
                email: data.email,
                phone: data.phone,
                birthDay: data.birthDay,
                province: data.province,
                address: data.address,
                password: data.password,
                image: new File([], "emptyFile")
            });
        });
    }, [putSuccess]);

    //get params from url
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paramValue = params.get('vnp_ResponseCode');
        if (paramValue) {
            setParamsPayment({
                code: paramValue,
                totalPrice: params.get('vnp_Amount')
            });
            setOpenModalPayment(true);
        }
    }, []);

    //use for fetching the transaction data and it recall when the dateTransaction change
    useEffect(() => {
        const userToken = ExtractInforToken();
        handleFetchTransactionHistory(userToken.id, dateTransaction, currentPage);
    }, [dateTransaction, currentPage]);

    const isObjectEmpty = (obj, fieldsToCheck) => {
        for (let key of fieldsToCheck) {
            if (obj.hasOwnProperty(key) && (obj[key] === "")) {
                return true;
            }
        }
        return false;
    };

    const onChangeFields = (e, field) => {
        setPutClientRequest({
            ...putClientRequest,
            [field]: e.target.value
        });
    };

    const handlePutClientInfor = () => {
        Swal.fire({
            title: "Bạn có chắc muốn cập nhật thông tin tài khoản?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(result => {
            if (result.isConfirmed) {
                if (isObjectEmpty(
                    putClientRequest, ["name", "email", "phone", "birthDay", "province", "address", "password"]
                )) {
                    message.warning("Vui lòng điền đủ thông tin");
                } else {
                    const putClient = new FormData();
                    putClient.append("id", userToken.id);
                    putClient.append("name", putClientRequest.name);
                    putClient.append("email", putClientRequest.email);
                    putClient.append("phone", putClientRequest.phone);
                    putClient.append("birthDay", putClientRequest.birthDay);
                    putClient.append("province", putClientRequest.province);
                    putClient.append("address", putClientRequest.address);
                    putClient.append("password", putClientRequest.password);
                    putClient.append("image", putClientRequest.image);
                    handleFetchPutClient(putClient);
                }
            }
        })
    };

    //upload Image
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    return (
        <>
            {<ModalPayment openModal={openModalPayment} setOpenModal={setOpenModalPayment} paramsPayment={paramsPayment} key={"ModalPayment"} />}
            <div className="mt-[80px] bg-[#1a1d29] py-[30px]">
                <div className="max-w-[80%] mx-auto border border-[#454D6A] rounded-md p-[10px]">
                    <div className="p-[10px] border-b border-dashed border-[#999]">
                        <div className="text-center">
                            <Image src={clientImage} style={{
                                width: "160px",
                                height: "160px",
                                objectFit: "cover",
                                borderRadius: "50%"
                            }} />
                        </div>
                    </div>
                    <div className="p-[10px]">
                        {/*  */}
                        <div>
                            <span className="text-[#FFF] font-medium">Họ Và Tên</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <input onChange={(e) => {
                                onChangeFields(e, "name");
                            }} value={putClientRequest.name} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập họ và tên...." />
                        </div>
                        {/*  */}
                        <div>
                            <span className="text-[#FFF] font-medium">Email</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <input onChange={(e) => {
                                onChangeFields(e, "email");
                            }} value={putClientRequest.email} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập email...." />
                        </div>
                        {/*  */}
                        <div>
                            <span className="text-[#FFF] font-medium">Số Điện Thoại</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <input onChange={(e) => {
                                onChangeFields(e, "phone");
                            }} value={putClientRequest.phone} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập số điện thoại...." />
                        </div>
                        {/*  */}
                        <div>
                            <span className="text-[#FFF] font-medium">Ngày Sinh</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <input onChange={(e) => {
                                onChangeFields(e, "birthDay");
                            }} value={putClientRequest.birthDay} type="date" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Chọn ngày sinh...." />
                        </div>
                        {/*  */}
                        <div>
                            <span className="text-[#FFF] font-medium">Thành Phố</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <select onChange={(e) => {
                                onChangeFields(e, "province");
                            }} value={putClientRequest.province} className="my-[10px] border border-[#e2e8f0]
                                            outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full">
                                <option value="">--Chọn thành phố--</option>
                                {provinces.map(item => {
                                    return (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {/*  */}
                        <div>
                            <span className="text-[#FFF] font-medium">Địa chỉ</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <input onChange={(e) => {
                                onChangeFields(e, "address");
                            }} value={putClientRequest.address} type="text" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập địa chỉ...." />
                        </div>
                        {/*Mật khẩu*/}
                        <div>
                            <span className="text-[#FFF] font-medium">Mật khẩu</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <input onChange={(e) => {
                                onChangeFields(e, "password");
                            }} value={putClientRequest.password} type="password" className="my-[10px] border border-[#e2e8f0]
                                    outline-none py-[10px] px-[10px] text-[15px] rounded-md w-full" placeholder="Nhập mật khẩu...." />
                        </div>
                        {/*  */}
                        <div>
                            <span className="font-medium text-[#FFF]">Chọn Ảnh</span>
                            <span className="text-[red]">*</span>
                            <br />
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                maxCount={1}
                                onPreview={handlePreview}
                                onChange={(e) => {
                                    setPutClientRequest({
                                        ...putClientRequest,
                                        image: e.file.originFileObj
                                    });
                                }}
                            >
                                <span className="text-[#FFF]">Upload</span>
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </div>
                        <div className="text-center">
                            <button onClick={handlePutClientInfor} className="uppercase text-[#FFF] bg-[var(--primary-limegreen)] font-bold text-[18px] rounded-md outline-none border
                            border-[var(--primary-limegreen)] py-[10px] px-[80px]">Cập nhật</button>
                        </div>
                    </div>
                    <Card
                        title="Lịch sử giao dịch"
                        extra={
                            <DatePicker onChange={(date) => setDateTransaction(dayjs(date).format("YYYY-MM-DD"))} allowClear format={"YYYY-MM-DD"} placeholder="Chọn ngày tìm kiếm" className="w-[300px]" />
                        }
                    >
                        <Table
                            columns={columnsTable}
                            dataSource={listTransactionHistory}
                            scroll={{
                                x: "2200px"
                            }}
                            pagination={false}

                        >
                        </Table>
                        <Pagination onChange={(page) => {
                            setCurrentPage(page);
                        }} pageSize={DEFAUTL_PAGE_SIZE} total={totalPages} />
                    </Card>
                </div>
            </div>
        </>
    )

}