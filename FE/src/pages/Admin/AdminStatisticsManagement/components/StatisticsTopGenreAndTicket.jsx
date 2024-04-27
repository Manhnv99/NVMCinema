import 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export const StatisticsTopGenreAndTicket = () => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: "Số vé",
                data: [12, 19, 3, 5, 2, 3],
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
                data: [12, 19, 3, 5, 2, 3, 30],
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
            <h2>Bar Chart Example</h2>
            <Bar data={data} />
        </div>
    );
}