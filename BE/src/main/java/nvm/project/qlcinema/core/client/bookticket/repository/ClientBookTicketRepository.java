package nvm.project.qlcinema.core.client.bookticket.repository;

import nvm.project.qlcinema.core.client.bookticket.model.request.ClientBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.client.bookticket.model.response.ClientBookTicketListShowtimeResponse;
import nvm.project.qlcinema.repository.ShowTimeRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientBookTicketRepository extends ShowTimeRepository {

    @Query(value = """
            SELECT  s.id AS showTimeId,
                    b.id AS branchId,
                    s.time_start AS timeStart,
                    f.name AS format,
                    m.subtitle AS subTitle,
                    r.name AS roomName
            FROM showtime s
            JOIN movie m ON s.movie_id = m.id
            JOIN format f ON m.format_id = f.id
            JOIN room r ON s.room_id = r.id
            JOIN branch b ON r.branch_id = b.id
            JOIN area a ON b.area_id = a.id
            WHERE
            s.screening_date = :#{#request.date} AND
            a.id = :#{#request.areaId} AND
            m.id = :#{#request.movieId} AND
            FIND_IN_SET( b.id , :#{#request.branchId} )
            """,nativeQuery = true)
    List<ClientBookTicketListShowtimeResponse> getListShowTime(ClientBookTicketListShowTimeRequest request);
//    AND (
//                        (s.screening_date = CURRENT_DATE() AND s.time_start > CURRENT_TIME())
//    OR (s.screening_date != CURRENT_DATE())
//            )
}
