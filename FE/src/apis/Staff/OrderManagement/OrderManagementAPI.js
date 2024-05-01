import { URL_API_STAFF_ORDER_MANAGEMENT } from "../../../app/BaseApi/BaseApi";
import { requestAPI } from "../../axiosCustomize";


export class OrderManagementAPI {

    static fetchListSearchOrder = (orderCode, date, timeStart, branchId, orderStatus, page) => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_ORDER_MANAGEMENT + "/get-search-order",
            params: {
                orderCode: orderCode,
                date: date,
                timeStart: timeStart,
                branchId: branchId,
                orderStatus: orderStatus,
                page: page
            }
        });
    };

    static fetchApprovedOrCancel = (userId, orderId, approvedOrCancelOrRestore) => {
        return requestAPI({
            method: "PUT",
            url: URL_API_STAFF_ORDER_MANAGEMENT + "/approved-or-cancel",
            params: {
                userId: userId,
                orderId: orderId,
                approvedOrCancelOrRestore: approvedOrCancelOrRestore
            }
        });
    };

    static fetchDetailOrder = (orderId) => {
        return requestAPI({
            method: "GET",
            url: URL_API_STAFF_ORDER_MANAGEMENT + `/get-detail-order/${orderId}`
        });
    };

}