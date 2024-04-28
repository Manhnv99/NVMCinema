import { useEffect, useState } from "react"
import { StaffManagementAPI } from "../../../../apis/AdminArea/StaffManagement/StaffManagementAPI";
import { toast } from "react-toastify";
import { ExtractInforToken } from "../../../../utils/Extract/ExtractInforToken";


export const useBranch = () => {

    const [listBranch, setListBranch] = useState([]);

    const fetchListBranch = async (areaId) => {
        try {
            const response = await StaffManagementAPI.fetchListBranch(areaId);
            setListBranch(response.data.data);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {
        fetchListBranch(ExtractInforToken().areaId);
    }, []);

    return {
        listBranch
    };

};