package nvm.project.qlcinema.core.admin.statisticsmanagement.repository;

import nvm.project.qlcinema.core.admin.statisticsmanagement.model.request.AdminStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.response.AdminStatisticsManagementGetMonthResponse;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.response.AdminStatisticsManagementGetRevenueResponse;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.response.AdminStatisticsManagementGetTopMovieAndTicketResponse;
import nvm.project.qlcinema.core.admin.statisticsmanagement.model.response.AdminStatisticsManagementGetYearResponse;
import nvm.project.qlcinema.repository.OrderRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminStatisticsManagementRepository extends OrderRepository {

    @Query(value = """
                SELECT	COUNT(odt.id) AS ticketSold,
                		CASE WHEN SUM(o.total_price) IS NULL THEN 0 ELSE SUM(o.total_price) END AS totalRevenue
                FROM order_detail_ticketchair odt
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN orders o ON o.id = odt.order_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%",:areaId,"%")
                AND o.order_status = "CHUA_DUYET"
                AND YEAR(o.order_date) = YEAR(NOW())
                """,nativeQuery = true)
    AdminStatisticsManagementGetRevenueResponse getRevenueForYear(String areaId);

    @Query(value = """
                SELECT	COUNT(odt.id) AS ticketSold,
                		CASE WHEN SUM(o.total_price) IS NULL THEN 0 ELSE SUM(o.total_price) END AS totalRevenue
                FROM order_detail_ticketchair odt
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN orders o ON o.id = odt.order_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%",:areaId,"%")
                AND o.order_status = "CHUA_DUYET"
                AND MONTH(o.order_date) = MONTH(NOW())
                """,nativeQuery = true)
    AdminStatisticsManagementGetRevenueResponse getRevenueForMonth(String areaId);

    @Query(value = """
                SELECT	COUNT(odt.id) AS ticketSold,
                		CASE WHEN SUM(o.total_price) IS NULL THEN 0 ELSE SUM(o.total_price) END AS totalRevenue
                FROM order_detail_ticketchair odt
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN orders o ON o.id = odt.order_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%",:areaId,"%")
                AND o.order_status = "CHUA_DUYET"
                AND o.order_date = CURRENT_DATE()
                """,nativeQuery = true)
    AdminStatisticsManagementGetRevenueResponse getRevenueForToday(String areaId);

    @Query(value = """
                SELECT DISTINCT YEAR(o.order_date) AS year
                FROM orders o
                JOIN order_detail_ticketchair odt ON odt.order_id = o.id
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%", :areaId ,"%")
                AND o.order_status = "CHUA_DUYET"
                """,nativeQuery = true)
    List<AdminStatisticsManagementGetYearResponse> getYear(String areaId);

    @Query(value = """
                SELECT DISTINCT MONTH(o.order_date) as month
                FROM orders o
                JOIN order_detail_ticketchair odt ON odt.order_id = o.id
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%", :areaId ,"%")
                AND YEAR(o.order_date) = :year
                AND o.order_status = "CHUA_DUYET"
                """,nativeQuery = true)
    List<AdminStatisticsManagementGetMonthResponse> getMonth(int year, String areaId);

    @Query(value = """
                SELECT
                    COUNT(odt.id) AS ticketSold,
                    CASE
                        WHEN SUM(o.total_price) IS NULL THEN 0
                        ELSE SUM(o.total_price)
                    END AS totalRevenue,
                    m.name as movieName
                FROM
                    order_detail_ticketchair odt
                JOIN ticket_chair tc ON
                    tc.id = odt.ticket_chair_id
                JOIN orders o ON
                    o.id = odt.order_id
                JOIN showtime st ON
                    st.id = tc.show_time_id
                JOIN room r ON
                    r.id = st.room_id
                JOIN branch b ON
                    b.id = r.branch_id
                JOIN area a ON
                    a.id = b.area_id
                JOIN movie m ON
                    m.id = st.movie_id
                WHERE
                    a.id = :#{#request.areaId} AND
                    (
                        ( :#{#request.year} IS NULL ) OR
                        ( YEAR(o.order_date) = :#{#request.year} AND
                            (
                                ( :#{#request.month} IS NULL ) OR
                                ( MONTH(o.order_date) = :#{#request.month} )
                            )
                        )
                    ) AND
                    (
                        ( :#{#request.dateStart} IS NULL AND :#{#request.dateEnd} IS NULL ) OR
                        ( o.order_date BETWEEN :#{#request.dateStart} AND :#{#request.dateEnd} )
                    )
                GROUP BY
                    movieName
                ORDER BY
                    ticketSold DESC
                LIMIT :#{#request.top}
                """,nativeQuery = true)
    List<AdminStatisticsManagementGetTopMovieAndTicketResponse> getTopMovieAndTicket(AdminStatisticsManagementGetTopMovieAndTicketRequest request);

}
