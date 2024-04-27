import { DatePicker, Select } from 'antd';
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { STATISTICS_FILTER_BY, STATISTICS_MONTH_OF_YEAR, STATISTICS_TOP_FILTER } from '../../../../app/Constant/StatisticsConstant';
import { useStatisticsTopMovieAndTicket } from '../hooks/useStatisticsTopMovieAndTicket';
import { ConvertCurrencyVND } from '../../../../utils/ConvertCurrency/ConvertCurrency';

export const StatisticsTopMovieAndTicket = () => {

    //custom hooks
    const {
        yearFilter, monthFilter, topMovieAndTicket,
        handleFetchStatisticGetMonth
    } = useStatisticsTopMovieAndTicket();
    //value onChange
    const [filterBy, setFilterBy] = useState(STATISTICS_FILTER_BY[0].value);
    //year month choose to filter
    const [yearChooseFilter, setYearChooseFilter] = useState(new Date().getFullYear()); //make it select this year for the first time
    const [monthChooseFilter, setMonthChooseFilter] = useState(0);


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

    return (
        <div>
            <p className='text-[20px] font-bold'>Top phim được xem nhiều nhất</p>
            <Select
                options={STATISTICS_TOP_FILTER}
                className='w-[100px] mt-[10px]'
                value={STATISTICS_TOP_FILTER[0].value}
            />
            <div className='my-[20px]'>
                <span className='font-bold text-[18px] mr-[10px]'>
                    <FilterOutlined className='text-[30px]' />
                    Bộ lọc:
                </span>
                <div className='flex items-center mt-[10px] mb-[20px]'>
                    <div className='mr-[10px]'>
                        <p className='font-bold text-[15px] mb-[5px]'>Thống kê theo</p>
                        <Select
                            allowClear
                            placeholder="--Thống kê theo--"
                            options={STATISTICS_FILTER_BY}
                            className='w-[150px]'
                            value={filterBy}
                            onChange={(value) => setFilterBy(value)}
                        />
                    </div>
                    {/*  */}

                    <div style={{
                        display: filterBy === STATISTICS_FILTER_BY[0].value || filterBy === STATISTICS_FILTER_BY[1].value ? "block" : "none"
                    }} className='mr-[10px]'>
                        <p className='font-bold text-[15px] mb-[5px]'>Năm</p>
                        <Select
                            allowClear
                            placeholder="--Chọn Năm--"
                            className='w-[150px]'
                            options={yearFilter.map(item => {
                                return {
                                    label: item.year,
                                    value: item.year
                                }
                            })}
                            value={yearChooseFilter}
                            onChange={(value) => {
                                setYearChooseFilter(value);
                                handleFetchStatisticGetMonth(value, "1");
                            }}
                        />
                    </div>
                    <div style={{
                        display: filterBy === STATISTICS_FILTER_BY[1].value ? "block" : "none"
                    }} className='mr-[10px]'>
                        <p className='font-bold text-[15px] mb-[5px]'>Tháng</p>
                        <Select
                            allowClear
                            placeholder="--Chọn Tháng--"
                            className='w-[150px]'
                            options={monthFilter.map(item => {
                                return {
                                    label: item.month,
                                    value: item.month
                                }
                            })}
                            onChange={(value) => {
                                setMonthChooseFilter(value);
                            }}
                        />
                    </div>
                    <div style={{
                        display: filterBy === STATISTICS_FILTER_BY[2].value ? "flex" : "none"
                    }} className='flex items-center'>
                        <div className='mr-[10px]'>
                            <p className='font-bold text-[15px] mb-[5px]'>Từ Ngày</p>
                            <DatePicker
                                placeholder='Chọn từ ngày'
                                className='w-[200px]'
                            />
                        </div>
                        <div>
                            <p className='font-bold text-[15px] mb-[5px]'>Từ Ngày</p>
                            <DatePicker
                                placeholder='Chọn đến ngày'
                                className='w-[200px]'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Bar
                data={datasets}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        }
                    },
                    scales: {
                        ticketSold: {
                            type: "linear",
                            position: "left"
                        },
                        totalRevenue: {
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
        </div>
    );
}