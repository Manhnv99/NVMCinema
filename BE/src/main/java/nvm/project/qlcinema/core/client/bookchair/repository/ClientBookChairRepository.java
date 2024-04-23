package nvm.project.qlcinema.core.client.bookchair.repository;

import nvm.project.qlcinema.core.client.bookchair.model.response.ClientBookChairDetailShowTimeResponse;
import nvm.project.qlcinema.core.client.bookchair.model.response.ClientBookChairListTicketChairResponse;
import nvm.project.qlcinema.repository.TicketChairRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientBookChairRepository extends TicketChairRepository {

    @Query(value = """
                SELECT	st.id AS showTimeId,
                		b.name AS branchName,
                		r.name AS roomName,
                        st.screening_date AS screeningDate,
                        st.time_start AS timeStart,
                        m.name AS movieName,
                        m.age_restriction AS ageRestriction,
                        m.subtitle AS subTitle,
                        f.name AS format
                FROM showtime st
                JOIN movie m ON st.movie_id = m.id
                JOIN format f ON m.format_id = f.id
                JOIN room r ON st.room_id = r.id
                JOIN branch b ON r.branch_id = b.id
                WHERE st.id = :showTimeId
                """,nativeQuery = true)
    ClientBookChairDetailShowTimeResponse getDetailShowTime(String showTimeId);

    @Query(value = """
                SELECT  tc.id AS id,
                        tc.chair_name AS name,
                        tc.status AS status,
                        st.ticket_price AS price
                FROM ticket_chair tc
                JOIN showtime st ON tc.show_time_id = st.id
                WHERE tc.show_time_id = :showTimeId
                ORDER BY tc.created_at ASC
                """,nativeQuery = true)
    List<ClientBookChairListTicketChairResponse> getListTicketChair(String showTimeId);

}
