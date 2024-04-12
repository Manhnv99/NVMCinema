import { useEffect, useState } from "react";
import { message } from "antd";
import { MovieManagementAPI } from "../../../../apis/Admin/MovieManagement/MovieManagementAPI";


export const useFetchEntity = () => {

    //list state
    const [listCountry, setListCountry] = useState([]);

    const [listDirector, setListDirector] = useState([]);

    const [listGenre, setListGenre] = useState([]);

    const [listFormat, setListFormat] = useState([]);


    const fetchListCountry = async () => {
        try {
            const response = await MovieManagementAPI.fetchListCountry();
            setListCountry(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const fetchListDirector = async () => {
        try {
            const response = await MovieManagementAPI.fetchListDirector();
            setListDirector(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const fetchListGenre = async () => {
        try {
            const response = await MovieManagementAPI.fetchListGenre();
            setListGenre(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    const fetchListFormat = async () => {
        try {
            const response = await MovieManagementAPI.fetchListFormat();
            setListFormat(response.data.data);
        } catch (e) {
            for (let errMessage in e.response.data) {
                message.error(e.response.data[errMessage]);
            }
        }
    };

    useEffect(() => {
        fetchListCountry();
        fetchListDirector();
        fetchListGenre();
        fetchListFormat();
    }, []);

    return {
        listCountry,
        listDirector,
        listGenre,
        listFormat
    };

}