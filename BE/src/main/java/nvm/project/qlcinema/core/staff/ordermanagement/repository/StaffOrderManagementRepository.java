package nvm.project.qlcinema.core.staff.ordermanagement.repository;

import nvm.project.qlcinema.core.staff.ordermanagement.model.request.StaffOrderManagementListOrderRequest;
import nvm.project.qlcinema.core.staff.ordermanagement.model.response.StaffOrderManagementListOrderResponse;
import nvm.project.qlcinema.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;

@Repository
public interface StaffOrderManagementRepository extends OrderRepository {

    @Query(value = """
                SELECT
                    o.id AS orderId,
                    m.banner_url AS movieImage,
                    o.code AS orderCode,
                    c.code AS clientCode,
                    c.name AS clientName,
                    m.name AS movie,
                    CONCAT(st.screening_date, " ", st.time_start) AS showtime,
                    o.total_price AS totalPrice,
                    pme.promotion_price AS promotion,
                    GROUP_CONCAT(DISTINCT tc.chair_name SEPARATOR ',') AS chair,
                    GROUP_CONCAT(DISTINCT CONCAT(odc.quantity, " x ", cf.name) SEPARATOR ', ') AS food,
                    CASE
                    	WHEN o.formality = 0 THEN "ONLINE"
                        ELSE "OFFLINE"
                    END as onlineOrOffline,
                    u.code AS userCode,
                    o.order_status AS orderStatus
                FROM
                    orders o
                JOIN order_detail_ticketchair odt ON odt.order_id = o.id
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN movie m ON m.id = st.movie_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN order_detail_combofood odc ON odc.order_id = o.id
                LEFT JOIN combo_food cf ON cf.id = odc.combo_food_id
                LEFT JOIN promotion_event pme ON pme.id = o.promotion_event_id
                LEFT JOIN client c ON c.id = o.client_id
                LEFT JOIN users u ON u.id = o.user_id
                WHERE
                    (b.id = :#{#request.branchId}) AND
                    (o.order_status = :#{#request.orderStatus}) AND
                    (:#{#request.orderCode} IS NULL OR o.code LIKE CONCAT('%', :#{#request.orderCode}, '%')) AND
                    (:#{#request.date} IS NULL OR o.order_date = :#{#request.date}) AND
                    (:#{#request.timeStart} IS NULL OR st.time_start = :#{#request.timeStart})
                GROUP BY
                    o.id,o.code, c.code, c.name, m.name, m.banner_url, CONCAT(st.screening_date, " ", st.time_start), o.total_price, pme.promotion_price,o.created_at,
                    o.formality, u.code, o.order_status
                ORDER BY
                    o.created_at DESC;
                """,nativeQuery = true)
    Page<StaffOrderManagementListOrderResponse> getListSearchOrder(Pageable pageable, StaffOrderManagementListOrderRequest request);

    @Query("""
            SELECT DISTINCT st.screeningDate
            FROM Order o
            JOIN OrderDetailTicketChair otc ON o.id = otc.orderId.id
            JOIN TicketChair tc ON tc.id = otc.ticketChairId.id
            JOIN ShowTime st ON st.id = tc.showTimeId.id
            WHERE o.id = :orderId
            """)
    LocalDate getDateScreeningByOrderId(String orderId);

    @Query("""
            SELECT DISTINCT st.timeStart
            FROM Order o
            JOIN OrderDetailTicketChair otc ON o.id = otc.orderId.id
            JOIN TicketChair tc ON tc.id = otc.ticketChairId.id
            JOIN ShowTime st ON st.id = tc.showTimeId.id
            WHERE o.id = :orderId
            """)
    Time getTimeStartByOrderId(String orderId);

}
