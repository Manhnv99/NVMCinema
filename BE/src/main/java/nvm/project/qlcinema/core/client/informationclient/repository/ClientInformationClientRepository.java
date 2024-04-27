package nvm.project.qlcinema.core.client.informationclient.repository;

import nvm.project.qlcinema.core.client.informationclient.model.response.ClientInformationClientDetailClientResponse;
import nvm.project.qlcinema.core.client.informationclient.model.response.ClientInformationClientTransactionHistoryResponse;
import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.repository.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ClientInformationClientRepository extends ClientRepository {

    @Query(value = """
                SELECT  c.name AS name,
                        c.email AS email,
                        c.phone_number AS phone,
                        c.birthday AS birthDay,
                        c.province AS province,
                        c.address_detail AS address,
                        c.password AS password,
                        c.image_url AS imageUrl
                FROM client c
                WHERE c.id = :id
                """,nativeQuery = true)
    ClientInformationClientDetailClientResponse getInformationClientDetail(String id);

    @Query(value = """
                SELECT	o.code AS code,
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
                JOIN order_detail_combofood odc ON odc.order_id = o.id
                LEFT JOIN combo_food cf ON cf.id = odc.combo_food_id
                LEFT JOIN promotion_event pme ON pme.id = o.promotion_event_id
                WHERE o.client_id = :clientId
                AND (:dateFind IS NULL OR o.order_date >= :dateFind)
                GROUP BY    o.code ,
                         	m.name ,
                         	m.banner_url ,
                         	CONCAT(b.name, " - ", b.address) ,
                         	CONCAT(st.screening_date, " ", st.time_start) ,
                         	o.total_price ,
                         	pme.promotion_price;
                """,nativeQuery = true)
    Page<ClientInformationClientTransactionHistoryResponse> getInformationClientTransactionHistory(Pageable pageable, String clientId, LocalDate dateFind);

    @Query("""
            SELECT c FROM Client c WHERE c.email = :email
            """)
    Optional<Client> findClientByEmail(String email);

    @Query("""
            SELECT c FROM Client c WHERE c.phoneNumber = :phone
            """)
    Optional<Client> findClientByPhone(String phone);

}
