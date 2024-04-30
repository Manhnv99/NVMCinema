package nvm.project.qlcinema.core.adminarea.statisticsmanagement.repository;

import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopGenreAndTicketRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.request.AdminAreaStatisticsManagementGetTopMovieAndTicketRequest;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response.AdminAreaStatisticsManagementGetBlockTicketAndRevenueResponse;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response.AdminAreaStatisticsManagementGetLineTicketAndRevenueResponse;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response.AdminAreaStatisticsManagementGetMonthResponse;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response.AdminAreaStatisticsManagementGetTopComboFoodResponse;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response.AdminAreaStatisticsManagementGetTopGenreAndTicketResponse;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response.AdminAreaStatisticsManagementGetTopMovieAndTicketResponse;
import nvm.project.qlcinema.core.adminarea.statisticsmanagement.model.response.AdminAreaStatisticsManagementGetYearResponse;
import nvm.project.qlcinema.repository.OrderRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminAreaStatisticsManagementRepository extends OrderRepository {

    @Query(value = """
                SELECT	COUNT(odt.ticket_chair_id) AS ticketSold,
                		CASE WHEN SUM(DISTINCT o.total_price) IS NULL THEN 0 ELSE SUM(DISTINCT o.total_price) END AS totalRevenue
                FROM order_detail_ticketchair odt
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN orders o ON o.id = odt.order_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%",:areaId,"%")
                AND o.order_status = 'DA_DUYET'
                AND YEAR(o.order_date) = YEAR(NOW())
                """,nativeQuery = true)
    AdminAreaStatisticsManagementGetBlockTicketAndRevenueResponse getRevenueForYear(String areaId);

    @Query(value = """
                SELECT	COUNT(odt.id) AS ticketSold,
                		CASE WHEN SUM(DISTINCT o.total_price) IS NULL THEN 0 ELSE SUM(DISTINCT o.total_price) END AS totalRevenue
                FROM order_detail_ticketchair odt
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN orders o ON o.id = odt.order_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%",:areaId,"%")
                AND o.order_status = 'DA_DUYET'
                AND MONTH(o.order_date) = MONTH(NOW())
                """,nativeQuery = true)
    AdminAreaStatisticsManagementGetBlockTicketAndRevenueResponse getRevenueForMonth(String areaId);

    @Query(value = """
                SELECT	COUNT(odt.id) AS ticketSold,
                		CASE WHEN SUM(DISTINCT o.total_price) IS NULL THEN 0 ELSE SUM(DISTINCT o.total_price) END AS totalRevenue
                FROM order_detail_ticketchair odt
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN orders o ON o.id = odt.order_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                WHERE :areaId IS NULL OR a.id LIKE CONCAT("%",:areaId,"%")
                AND o.order_status = 'DA_DUYET'
                AND o.order_date = CURRENT_DATE()
                """,nativeQuery = true)
    AdminAreaStatisticsManagementGetBlockTicketAndRevenueResponse getRevenueForToday(String areaId);

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
                AND o.order_status = 'DA_DUYET'
                """,nativeQuery = true)
    List<AdminAreaStatisticsManagementGetYearResponse> getYear(String areaId);

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
                AND o.order_status = 'DA_DUYET'
                """,nativeQuery = true)
    List<AdminAreaStatisticsManagementGetMonthResponse> getMonth(int year, String areaId);

    @Query(value = """
            SELECT
                CASE
                    WHEN :#{#request.typeFilter} = 'YEAR' THEN MONTH(o.order_date)
                    ELSE o.order_date
                END AS date,
                COUNT(DISTINCT odt.id) AS ticketSold,
                SUM(o.total_price) AS totalRevenue
            FROM
                orders o
            JOIN
                order_detail_ticketchair odt ON o.id = odt.order_id
            JOIN
                ticket_chair tc ON odt.ticket_chair_id = tc.id
            JOIN
                showtime st ON tc.show_time_id = st.id
            JOIN
                room r ON r.id = st.room_id
            JOIN
                branch b ON b.id = r.branch_id
            JOIN
                area a ON a.id = b.area_id
            WHERE
                o.order_status = 'DA_DUYET' AND
                ( :#{#request.areaId} IS NULL OR a.id LIKE :#{ "%" + #request.areaId + "%"} ) AND
                (
                    (:#{#request.typeFilter} = 'YEAR' AND YEAR(o.order_date) = :#{#request.year})
                    OR (:#{#request.typeFilter} = 'MONTH' AND MONTH(o.order_date) = :#{#request.month})
                    OR (o.order_date BETWEEN :#{#request.dateStart} AND :#{#request.dateEnd})
                )
            GROUP BY
                date
            ORDER BY
                totalRevenue DESC;
            """,nativeQuery = true)
    List<AdminAreaStatisticsManagementGetLineTicketAndRevenueResponse> getLineTicketAndRevenue(
            AdminAreaStatisticsManagementGetLineTicketAndRevenueRequest request
    );

    @Query(value = """
                SELECT
                    COUNT(odt.id) AS ticketSold,
                    CASE
                        WHEN SUM(DISTINCT o.total_price) IS NULL THEN 0
                        ELSE SUM(DISTINCT o.total_price)
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
                    o.order_status = 'DA_DUYET' AND
                    ( :#{#request.areaId} IS NULL OR a.id LIKE :#{ "%" + #request.areaId + "%"} )
                GROUP BY
                    movieName
                ORDER BY
                    totalRevenue DESC
                LIMIT :#{#request.top}
                """,nativeQuery = true)
    List<AdminAreaStatisticsManagementGetTopMovieAndTicketResponse> getTopMovieAndTicket(AdminAreaStatisticsManagementGetTopMovieAndTicketRequest request);

    @Query(value = """
                SELECT
                    COUNT(odt.id) AS ticketSold,
                    CASE
                        WHEN SUM(DISTINCT o.total_price) IS NULL THEN 0
                        ELSE SUM(DISTINCT o.total_price)
                    END AS totalRevenue,
                    g.name as genreName
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
                JOIN genre g ON
                    g.id = m.genre_id
                WHERE
                    o.order_status = 'DA_DUYET' AND
                    ( :#{#request.areaId} IS NULL OR a.id LIKE :#{ "%" + #request.areaId + "%"} )
                GROUP BY
                    genreName
                ORDER BY
                    totalRevenue DESC
                LIMIT :#{#request.top}
                """,nativeQuery = true)
    List<AdminAreaStatisticsManagementGetTopGenreAndTicketResponse> getTopGenreAndTicket(AdminAreaStatisticsManagementGetTopGenreAndTicketRequest request);

    @Query(value = """
            SELECT
                COUNT(odc.id) AS comboSold,
                CASE
                    WHEN SUM(cf.price) IS NULL THEN 0
                ELSE SUM(cf.price)
                END AS totalRevenue,
                cf.name as comboName
            FROM order_detail_combofood odc
            JOIN combo_food cf ON
                cf.id = odc.combo_food_id
            JOIN orders o ON
                o.id = odc.order_id
            JOIN order_detail_ticketchair odt ON
                odt.order_id = o.id
            JOIN ticket_chair tc ON
                tc.id = odt.ticket_chair_id
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
            JOIN genre g ON
                g.id = m.genre_id
            WHERE
                o.order_status = 'DA_DUYET' AND
                ( :areaId IS NULL OR a.id LIKE CONCAT("%", :areaId ,"%") )
            GROUP BY
                comboName
            ORDER BY
            totalRevenue DESC
                """,nativeQuery = true)
    List<AdminAreaStatisticsManagementGetTopComboFoodResponse> getTopComboFood(String areaId);

}
