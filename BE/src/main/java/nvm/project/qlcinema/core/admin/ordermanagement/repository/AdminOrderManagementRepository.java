package nvm.project.qlcinema.core.admin.ordermanagement.repository;

import nvm.project.qlcinema.core.admin.ordermanagement.model.request.AdminOrderManagementListOrderRequest;
import nvm.project.qlcinema.core.admin.ordermanagement.model.response.AdminOrderManagementListOrderResponse;
import nvm.project.qlcinema.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminOrderManagementRepository extends OrderRepository {

    @Query(value = """
                SELECT	o.code AS orderCode,
                		c.code AS clientCode,
                        c.name AS clientName,
                        m.name AS movie,
                        m.banner_url AS movieImage,
                        CONCAT(b.name," - ",b.address) AS branch,
                        CONCAT(st.screening_date," ",st.time_start) as showtime,
                		o.total_price AS totalPrice,
                		pme.promotion_price AS promotion,
                		GROUP_CONCAT(DISTINCT tc.chair_name SEPARATOR ',') AS chair,
                		GROUP_CONCAT(DISTINCT CONCAT(odc.quantity," x ",cf.name) SEPARATOR ', ') AS food
                FROM orders o
                JOIN order_detail_ticketchair odt ON odt.order_id = o.id
                JOIN ticket_chair tc ON tc.id = odt.ticket_chair_id
                JOIN showtime st ON st.id = tc.show_time_id
                JOIN movie m ON m.id = st.movie_id
                JOIN room r ON r.id = st.room_id
                JOIN branch b ON b.id = r.branch_id
                JOIN area a ON a.id = b.area_id
                JOIN order_detail_combofood odc ON odc.order_id = o.id
                LEFT JOIN combo_food cf ON cf.id = odc.combo_food_id
                LEFT JOIN promotion_event pme ON pme.id = o.promotion_event_id
                JOIN client c ON c.id = o.client_id
                WHERE
                (
                    ( a.id = :#{#request.areaId} ) AND
                    ( o.order_status = :#{#request.orderStatus} ) AND
                    ( :#{#request.orderCode} IS NULL OR o.code LIKE CONCAT('%', :#{#request.orderCode}, '%') ) AND
                    ( :#{#request.clientName} IS NULL OR c.name LIKE CONCAT('%', :#{#request.clientName}, '%') ) AND
                    ( :#{#request.date} IS NULL OR o.order_date = :#{#request.date} ) AND
                    ( :#{#request.timeStart} IS NULL OR st.time_start = :#{#request.timeStart} )
                )
                GROUP BY orderCode , clientCode , clientName , movie , movieImage , branch , showtime , totalPrice , promotion;
                """,nativeQuery = true)
    Page<AdminOrderManagementListOrderResponse> getListSearchOrder(Pageable pageable, AdminOrderManagementListOrderRequest request);

}
