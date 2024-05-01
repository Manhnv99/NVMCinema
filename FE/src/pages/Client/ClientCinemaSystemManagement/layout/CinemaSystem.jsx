import { useEffect, useState } from "react";
import { useCinemaSystem } from "../hooks/useCinemaSystem";
import { ModalDetailComponent } from "../components/ModalDetailComponent";


export const CinemaSystem = () => {

    //custom hooks
    const {
        listBranch,
        handleFetchDetailBranch, dataDetail
    } = useCinemaSystem();
    //open modal
    const [openModal, setOpenModal] = useState(false)
    //state
    const [branchId, setBranchId] = useState("");
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        if (firstRender) {
            handleFetchDetailBranch(branchId)
        } else {
            setFirstRender(true);
        }
    }, [branchId]);

    return (
        <>
            {<ModalDetailComponent openModal={openModal} setOpenModal={setOpenModal} dataDetail={dataDetail} key={"ModalDetailComponent"} />}
            <div className="mt-[80px] bg-[#1a1d29] py-[50px]">
                <div className="max-w-[90%] mx-auto text-[#FFF]">
                    <p className="font-bold text-[25px] text-center pb-[30px]">Hệ thống rạp</p>
                    <div className="grid grid-cols-4 gap-20">
                        {listBranch.map((item, index) => (
                            <div className="text-center" key={index}>
                                <img className="rounded-md h-[400px] object-cover" src={item.image} />
                                <p className="font-bold text-[17px] my-[10px]">{item.name}</p>
                                <button onClick={() => {
                                    setBranchId(item.id);
                                    setOpenModal(true);
                                }} className="outline-none bg-[var(--primary-limegreen)] w-[80%] h-[40px] rounded-md font-bold text-[18px]">Thông tin chi tiết</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}