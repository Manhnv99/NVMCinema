import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from 'react';
import { useStatisticsTopMovieAndTicket } from '../hooks/useStatisticsTopMovieAndTicket';
import { ConvertCurrencyVND } from '../../../../utils/ConvertCurrency/ConvertCurrency';
import { Select } from "antd";

export const StatisticsTopMovieAndTicket = ({ currentArea }) => {

    //custom hooks
    const {
        handleFetchStatisticsTopMovieAndTicket, topMovieAndTicket
    } = useStatisticsTopMovieAndTicket();
    //state
    const topSelectConstant = [
        { label: "TOP 5", value: 5 },
        { label: "TOP 10", value: 10 },
        { label: "TOP 15", value: 15 },
    ]
    const [topFilter, setTopFilter] = useState(topSelectConstant[0].value); //select the first element

    //datasets for Bar
    const datasets = {
        labels: topMovieAndTicket.map(item => item.movieName), //Tên phim
        datasets: [
            {
                label: "Số vé",
                data: topMovieAndTicket.map(item => item.ticketSold),
                yAxisID: 'ticketSold',
                backgroundColor: [
                    'rgba(83,155,232,0.5)',
                ],
                borderColor: [
                    'rgba(83,155,232,1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Doanh thu',
                data: topMovieAndTicket.map(item => item.totalRevenue),
                yAxisID: 'totalRevenue',
                backgroundColor: [
                    'rgba(242, 160, 68, 0.5)',
                ],
                borderColor: [
                    'rgba(242, 160, 68, 1)',
                ],
                borderWidth: 1
            },
        ]
    };

    useEffect(() => {
        handleFetchStatisticsTopMovieAndTicket(currentArea, topFilter);
    }, [topFilter, currentArea]);


    return (
        <>
            <Select
                options={topSelectConstant}
                value={topFilter}
                onChange={(value) => setTopFilter(value)}
            />
            <Bar
                data={datasets}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true,
                            text: "Top Bộ Phim Có Danh Thu Cao Nhất",
                            font: {
                                size: "20px",
                                weight: "bold"
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    if (context.dataset.yAxisID === "totalRevenue") {
                                        return context.dataset.label + ":" + context.formattedValue + "VNĐ"
                                    }
                                }
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
    );
}