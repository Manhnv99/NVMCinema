import { message } from "antd"

export const messageSuccessResponse = (data) => {
    message.success({
        className: "z-[100000000]",
        content: data
    });
};

export const messageWarResponse = (data) => {
    message.warning({
        className: "z-[100000000]",
        content: data
    });
};

export const messageErrResponse = (data) => {
    message.error({
        className: "z-[100000000]",
        content: data
    });
};
