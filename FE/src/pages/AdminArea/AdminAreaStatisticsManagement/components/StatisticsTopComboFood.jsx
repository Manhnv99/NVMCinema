import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect } from 'react';
import { ConvertCurrencyVND } from '../../../../utils/ConvertCurrency/ConvertCurrency';
import { useStatisticsTopComboFood } from "../hooks/useStatisticsTopComboFood";

export const StatisticsTopComboFood = ({ currentArea }) => {

    //custom hooks
    const {
        handleFetchStatisticsTopComboFood, topComboFood
    } = useStatisticsTopComboFood();

    //datasets for Bar
    const datasets = {
        labels: topComboFood.map(item => item.comboName), //Tên phim
        datasets: [
            {
                label: "Số lượng mua",
                data: topComboFood.map(item => item.comboSold),
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
                data: topComboFood.map(item => item.totalRevenue),
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
        handleFetchStatisticsTopComboFood(currentArea);
    }, [currentArea]);


    return (
        <>
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
                            text: "Top Đồ Ăn Được Yêu Thích Nhất",
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