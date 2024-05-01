package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementDetailOrderResponse;
import nvm.project.qlcinema.repository.OrderRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleCounterManagementBookChairOrderRepository extends OrderRepository {

    @Query(value = """
                SELECT	o.code AS orderCode,
                        o.created_at AS dateBuy,
                        b.name AS branchName,
                        b.address AS branchAddress,
                        st.screening_date AS screeningDate,
                        st.time_start AS timeStart,
                        f.name AS format,
                        m.name AS movieName,
                        pe.promotion_price AS promotion,
                        o.total_price AS totalPrice,
                        GROUP_CONCAT(DISTINCT CONCAT(odc.quantity," x ",cf.name) SEPARATOR ',') AS food,
                        GROUP_CONCAT(DISTINCT tc.chair_name SEPARATOR ',') AS chairName
                FROM orders o
                JOIN order_detail_ticketchair odtc ON odtc.order_id = o.id
                JOIN ticket_chair tc ON tc.id = odtc.ticket_chair_id
                JOIN order_detail_combofood odc ON odc.order_id = o.id
                LEFT JOIN combo_food cf ON cf.id = odc.combo_food_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                JOIN movie m ON m.id = st.movie_id
                JOIN format f ON f.id = m.format_id
                LEFT JOIN promotion_event pe ON pe.id = o.promotion_event_id
                WHERE o.code = :orderCode
                GROUP BY b.address, o.code, o.created_at, b.name, b.address, st.screening_date, st.time_start, f.name, m.name,
                pe.promotion_price, o.total_price
                """,nativeQuery = true)
    SaleCounterManagementDetailOrderResponse getDetailOrder(String orderCode);

}
