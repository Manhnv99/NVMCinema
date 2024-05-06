package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.request.SaleCounterManagementBookTicketListShowTimeRequest;
import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementBookTicketListShowtimeResponse;
import nvm.project.qlcinema.repository.ShowTimeRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleCounterManagementBookTicketRepository extends ShowTimeRepository {

    @Query(value = """
            SELECT  s.id AS showTimeId,
                    s.time_start AS timeStart,
                    f.name AS format,
                    m.subtitle AS subTitle,
                    r.name AS roomName
            FROM showtime s
            JOIN movie m ON s.movie_id = m.id
            JOIN format f ON m.format_id = f.id
            JOIN room r ON s.room_id = r.id
            JOIN branch b ON r.branch_id = b.id
            WHERE
            s.screening_date = :#{#request.date} AND
            b.id = :#{#request.branchId} AND
            m.id = :#{#request.movieId} AND
            (
            (s.screening_date = CURRENT_DATE() AND s.time_start > CURRENT_TIME()) OR
            (s.screening_date != CURRENT_DATE())
            )
                """, nativeQuery = true)
    List<SaleCounterManagementBookTicketListShowtimeResponse> getListShowTime(SaleCounterManagementBookTicketListShowTimeRequest request);

}
