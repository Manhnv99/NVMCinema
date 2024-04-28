import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlockStatisticsRevenue } from "./components/BlockStatisticsRevenue";
import { StatisticsTopGenreAndTicket } from "./components/StatisticsTopGenreAndTicket";
import { StatisticsTopMovieAndTicket } from "./components/StatisticsTopMovieAndTicket";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { StatisticsTopComboFood } from "./components/StatisticsTopComboFood";
import { StatisticsRevenueAndTicket } from "./components/StatisticsRevenueAndTicket";
import { ExtractInforToken } from "../../../utils/Extract/ExtractInforToken";


export const StatisticsManagement = () => {

    return (
        <>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-[25px]">
                    <FontAwesomeIcon icon={faChartSimple} className="text-[40px] mr-[10px]" />
                    Thống kê
                </p>
            </div>
            <BlockStatisticsRevenue />
            <div className="mt-[20px]">
                <StatisticsRevenueAndTicket areaId={ExtractInforToken().areaId} />
            </div>
            <div className="mt-[20px]">
                <StatisticsTopMovieAndTicket currentArea={ExtractInforToken().areaId} />
            </div>
            <div className="mt-[20px]">
                <StatisticsTopGenreAndTicket currentArea={ExtractInforToken().areaId} />
            </div>
            <div className="mt-[20px]">
                <StatisticsTopComboFood currentArea={ExtractInforToken().areaId} />
            </div>
        </>
    )
};