
export const ConvertCurrencyVND = (money) => {
    if (money === undefined) {
        return "0 VNĐ"
    } else {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "VNĐ";
    }
};
