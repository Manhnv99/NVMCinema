import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlockStatisticsRevenue } from "./components/BlockStatisticsRevenue";
import { StatisticsTopGenreAndTicket } from "./components/StatisticsTopGenreAndTicket";
import { StatisticsTopMovieAndTicket } from "./components/StatisticsTopMovieAndTicket";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";


const StatisticsManagement = () => {

    return (
        <>
            <p className="font-semibold text-[25px]">
                <FontAwesomeIcon icon={faChartSimple} className="text-[40px] mr-[10px]" />
                Thống kê
            </p>
            <BlockStatisticsRevenue />
            <StatisticsTopMovieAndTicket />
            <StatisticsTopGenreAndTicket />
        </>
    )
}

export default StatisticsManagement;