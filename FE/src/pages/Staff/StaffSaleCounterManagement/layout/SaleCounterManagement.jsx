import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Typography } from "antd"
import { SearchComponent } from "../components/SearchComponent"
import { TableComponent } from "../components/TableComponent"
import { useEffect, useState } from "react"
import { ModalPayment } from "../components/ModalPayment"
import { useSaleCounter } from "../hooks/useSaleCounter"
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken"


export const SaleCounterManagement = () => {

    //openModal
    const [openModalPayment, setOpenModalPayment] = useState(false);
    const [paramsPayment, setParamsPayment] = useState({
        orderStatus: "",
        orderCode: "",
        totalPrice: 0
    });
    //customHook
    const {
        handleFetchDetailOrder
    } = useSaleCounter();
    //state
    const [branchId, setBranchId] = useState("");

    //get params from url
    useEffect(() => {
        setBranchId(ExtractInforToken().branchId);
        const params = new URLSearchParams(window.location.search);
        const paramValue = params.get('codeStatus');
        if (paramValue) {
            handleFetchDetailOrder(params.get('orderCode'));
            setParamsPayment({
                orderStatus: paramValue,
                orderCode: params.get('orderCode'),
                totalPrice: params.get('totalPrice')
            });
            setOpenModalPayment(true);
        }

    }, []);

    return (
        <>
            {<ModalPayment openModal={openModalPayment} setOpenModal={setOpenModalPayment} paramsPayment={paramsPayment} key={"ModalPayment"} />}
            <Typography.Title level={3}>
                <FontAwesomeIcon icon={faPeopleRoof} className='text-[30px] mr-[10px]' />
                Bán vé tại quầy
            </Typography.Title>
            <SearchComponent />
            <TableComponent branchId={branchId} />
        </>
    )
}