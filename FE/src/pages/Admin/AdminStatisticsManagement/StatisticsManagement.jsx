import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlockStatisticsRevenue } from "./components/BlockStatisticsRevenue";
import { StatisticsTopGenreAndTicket } from "./components/StatisticsTopGenreAndTicket";
import { StatisticsTopMovieAndTicket } from "./components/StatisticsTopMovieAndTicket";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { Select } from "antd";
import { useStatistics } from "./hooks/useStatistics";
import { useState } from "react";
import { StatisticsTopComboFood } from "./components/StatisticsTopComboFood";
import { StatisticsRevenueAndTicket } from "./components/StatisticsRevenueAndTicket";


export const StatisticsManagement = () => {

    //custom hooks
    const {
        listArea
    } = useStatistics();

    const [currentArea, setCurrentArea] = useState("");

    return (
        <>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-[25px]">
                    <FontAwesomeIcon icon={faChartSimple} className="text-[40px] mr-[10px]" />
                    Thống kê
                </p>
                <div>
                    <Select
                        options={[
                            { label: "Tất cả", value: "" }, ...listArea.map(item => {
                                return {
                                    label: item.name,
                                    value: item.id
                                }
                            })
                        ]}
                        className="w-[100px]"
                        value={currentArea}
                        onChange={(value) => setCurrentArea(value)}
                    />
                </div>
            </div>
            <BlockStatisticsRevenue />
            <div className="mt-[20px]">
                <StatisticsRevenueAndTicket areaId={currentArea} />
            </div>
            <div className="mt-[20px]">
                <StatisticsTopMovieAndTicket currentArea={currentArea} />
            </div>
            <div className="mt-[20px]">
                <StatisticsTopGenreAndTicket currentArea={currentArea} />
            </div>
            <div className="mt-[20px]">
                <StatisticsTopComboFood currentArea={currentArea} />
            </div>
        </>
    )
}