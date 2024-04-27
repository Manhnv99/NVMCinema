import { Modal } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { setAreaChange } from "../../../../app/Redux/Slice/AreaSlice";


export const ModalChooseArea = ({ openModal, setOpenModal }) => {

    const listAreaGlobal = useSelector(state => state.area.listAreaGlobal);
    const dispatch = useDispatch();


    const handleChooseArea = (id) => {
        localStorage.setItem("area", id);
        dispatch(setAreaChange());
        setOpenModal(false);
    };

    return (
        <>
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={false}
                closeIcon={false}
            >
                <h1 className="font-bold text-[22px] text-center">Chọn khu vực bạn muốn mua vé</h1>
                <div className="flex justify-center items-center mt-[10px]">
                    {listAreaGlobal.map(item => {
                        return (
                            <div onClick={() => {
                                handleChooseArea(item.id);
                            }} key={"LIST_AREA"} className="hover:bg-[var(--primary-limegreen)] hover:text-[#FFF] hover:border-[#FFF]
                                duration-[0.2s] border border-[#999] py-[8px] px-[15px] rounded-md cursor-pointer mr-[10px]">{item.name}</div>
                        )
                    })}
                </div>
            </Modal>
        </>
    )

}