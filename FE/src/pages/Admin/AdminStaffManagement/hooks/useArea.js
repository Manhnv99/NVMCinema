import { useEffect, useState } from "react"
import { StaffManagementAPI } from "../../../../apis/Admin/StaffManagement/StaffManagementAPI";
import { toast } from "react-toastify";

export const useArea = () => {

    const [listArea, setListArea] = useState([]);

    const fetchListArea = async () => {
        try {
            const response = await StaffManagementAPI.fetchListArea();
            setListArea(response.data.data);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {
        fetchListArea();
    }, []);

    return {
        listArea
    }

}