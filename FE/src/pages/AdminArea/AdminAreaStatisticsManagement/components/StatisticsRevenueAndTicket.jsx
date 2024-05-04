import { useRevenueAndTicket } from "../hooks/useRevenueAndTicket";
import { Button, DatePicker, Select } from "antd";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ConvertCurrencyVND } from "../../../../utils/ConvertCurrency/ConvertCurrency";

export const StatisticsRevenueAndTicket = ({ areaId }) => {

    //custom hooks
    const {
        handleFetchStatisticsLineTicketAndRevenue, listLineTicketAndRevenue,
        handleFetchYear, listYear,
        handlFetchMonth, listMonth
    } = useRevenueAndTicket();
    const YEAR_CONSTANT = "YEAR";
    const MONTH_CONSTANT = "MONTH";
    const DAY_CONSTANT = "DAY";
    //constant
    const STATISTICS_FILTER_BY = [
        { label: "Theo Năm", value: YEAR_CONSTANT },
        { label: "Theo Tháng", value: MONTH_CONSTANT },
        { label: "Theo Ngày", value: DAY_CONSTANT },
    ];
    //state
    const [filterByValue, setFilterByValue] = useState(YEAR_CONSTANT);
    const [yearValue, setYearValue] = useState(new Date().getFullYear());
    const [monthValue, setMonthValue] = useState("");
    const [dateStartValue, setDateStartValue] = useState(null);
    const [dateEndValue, setDateEndValue] = useState(null);
    const [actionFilter, setActionFilter] = useState(false);

    //data for LineChart
    const datasets = {
        labels: listLineTicketAndRevenue.map(item => item.date),
        datasets: [
            {
                label: "Số vé",
                data: listLineTicketAndRevenue.map(item => item.ticketSold),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                yAxisID: "ticketSold"
            },
            {
                label: "Doanh Thu",
                data: listLineTicketAndRevenue.map(item => item.totalRevenue),
                fill: false,
                borderColor: 'rgb(63, 130, 247)',
                tension: 0.1,
                yAxisID: "totalRevenue"
            },
        ],
    };

    //useEffect to Filter
    useEffect(() => {
        handleFetchStatisticsLineTicketAndRevenue(areaId, yearValue, monthValue, dateStartValue === null ? null : dayjs(dateStartValue).format("YYYY-MM-DD"),
            dateEndValue === null ? null : dayjs(dateEndValue).format("YYYY-MM-DD"), filterByValue); //Fetch this year
    }, [actionFilter]);

    //useEffect to load year
    useEffect(() => {
        handleFetchYear(areaId);
        handlFetchMonth(yearValue, areaId);
    }, []);

    return (
        <>
            <div className="flex">
                <div className="mr-[10px]">
                    <p className="font-semibold">Lọc theo</p>
                    <Select
                        className="w-[150px]"
                        value={filterByValue}
                        options={STATISTICS_FILTER_BY}
                        onChange={(value) => setFilterByValue(value)}
                    />
                </div>
                <div style={{
                    display: filterByValue === YEAR_CONSTANT || filterByValue === MONTH_CONSTANT ? "block" : "none"
                }} className="mr-[10px]">
                    <p className="font-semibold">Năm</p>
                    <Select
                        className="w-[150px]"
                        value={yearValue}
                        options={listYear.map(item => {
                            return {
                                label: item.year,
                                value: item.year
                            }
                        })}
                        onChange={(value) => setYearValue(value)}
                    />
                </div>
                <div style={{
                    display: filterByValue === MONTH_CONSTANT ? "block" : "none"
                }} className="mr-[10px]">
                    <p className="font-semibold">Tháng</p>
                    <Select
                        className="w-[150px]"
                        value={monthValue}
                        placeholder="Chọn tháng"
                        options={listMonth.map(item => {
                            return {
                                label: item.month,
                                value: item.month
                            }
                        })}
                        onChange={(value) => setMonthValue(value)}
                    />
                </div>
                <div style={{
                    display: filterByValue === DAY_CONSTANT ? "block" : "none"
                }} className="mr-[10px]">
                    <p className="font-semibold">Ngày Bắt Đầu</p>
                    <DatePicker
                        value={dateStartValue}
                        onChange={(value) => setDateStartValue(value)}
                        placeholder="Chọn ngày bắt đầu!"
                    />
                </div>
                <div style={{
                    display: filterByValue === DAY_CONSTANT ? "block" : "none"
                }} className="mr-[10px]">
                    <p className="font-semibold">Ngày Kết Thúc</p>
                    <DatePicker
                        value={dateEndValue}
                        onChange={(value) => setDateEndValue(value)}
                        placeholder="Chọn ngày kết thúc!"
                    />
                </div>
                <div className="mr-[10px]">
                    <p className="font-semibold">Tìm Kiếm</p>
                    <Button onClick={() => { setActionFilter(!actionFilter) }} type="dashed">Tiến hành lọc</Button>
                </div>
            </div>
            <Line
                data={datasets}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Tổng Số Vé Và Doanh Thu",
                            font: {
                                size: "20px",
                                weight: "bold"
                            }
                        }
                    },
                    scales: {
                        ticketSold: { //thay đổi theo yAxisID
                            type: "linear",
                            position: "left"
                        },
                        totalRevenue: { //thay đổi theo yAxisID
                            type: "linear",
                            position: "right",
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                callback: (value, index, values) => {
                                    return ConvertCurrencyVND(value)
                                }
                            }
                        }
                    }
                }}
            />
        </>
    )

}