import { useEffect } from "react";
import { ClientHeaderLayout } from "./ClientHeaderLayout";
import { ClientFooterLayout } from "./ClientFooterLayout";


export const ClientLayoutManagement = ({ children }) => {

    useEffect(() => {
        console.log(window.location.pathname);
    }, []);

    return (
        <>
            <ClientHeaderLayout />
            {children}
            <ClientFooterLayout />
        </>
    )

}