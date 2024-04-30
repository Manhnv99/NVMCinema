package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementListMovieRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListMovieResponse;
import nvm.project.qlcinema.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SaleCounterManagementRepository extends OrderRepository {

    @Query(value = """
                SELECT	m.id AS id,
                		m.code AS code,
                        m.name AS name,
                        m.duration AS duration,
                        m.age_restriction AS ageRestriction,
                        m.release_date AS releaseDate,
                        m.actor AS actor,
                        m.subtitle AS subTitle,
                        m.banner_url AS bannerUrl,
                        d.name AS director,
                        g.name AS genre,
                        c.name AS country,
                        f.name AS format,
                        m.deleted AS deleted
                FROM movie m
                JOIN country c ON m.country_id = c.id
                JOIN director d ON m.director_id = d.id
                JOIN format f ON m.format_id = f.id
                JOIN genre g ON m.genre_id = g.id
                WHERE
                (
                    ( :#{#request.name} IS NULL OR m.name LIKE :#{ "%" + #request.name + "%"} ) AND
                    ( :#{#request.director} IS NULL OR d.name LIKE :#{ "%" + #request.director + "%"} ) AND
                    ( :#{#request.genre} IS NULL OR g.name LIKE :#{ "%" + #request.genre + "%"} ) AND
                    ( :#{#request.format} IS NULL OR f.name LIKE :#{ "%" + #request.format + "%"} ) AND
                    ( :#{#request.country} IS NULL OR c.name LIKE :#{ "%" + #request.country + "%"} )
                )
                ORDER BY m.created_at DESC
                """,nativeQuery = true)
    Page<SaleCounterManagementListMovieResponse> getSearchListMovie(Pageable pageable, SaleCounterManagementListMovieRequest request);

    //update order if the showtime of the order is before today and the order status is notApproval -> update orderStatus is Canceled
    @Modifying
    @Transactional
    @Query(value = """
            UPDATE orders o
            JOIN order_detail_ticketchair odtc ON odtc.order_id = o.id
            JOIN ticket_chair tc ON tc.id = odtc.ticket_chair_id
            JOIN showtime st ON st.id = tc.show_time_id
            SET o.order_status = 'DA_HUY'
            WHERE st.screening_date < CURRENT_DATE() AND o.order_status = 'CHUA_DUYET'
            """,nativeQuery = true)
    void updateOrderStatusWhenShowTimeExpire();

}
