package nvm.project.qlcinema.core.adminarea.showtimemanagement.repository;

import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.request.AdminAreaShowTimeManagementListShowTimeRequest;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementGetDetailResponse;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementGetListAreaResponse;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementGetListBranchResponse;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementGetListMovieResponse;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementGetListRoomResponse;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementGetOneResponse;
import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementListShowTimeResponse;
import nvm.project.qlcinema.entity.ShowTime;
import nvm.project.qlcinema.repository.ShowTimeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdminAreaShowTimeManagementRepository extends ShowTimeRepository {

    @Query(value = """
            SELECT  st.id AS id,
                    m.banner_url AS banner,
                    m.name AS movie,
                    r.name AS room,
                    b.name AS branch,
                    a.name AS area,
                    st.screening_date AS screeningDate,
                    st.time_start AS timeStart,
                    st.ticket_price AS ticketPrice
            FROM showtime st
            JOIN movie m ON st.movie_id = m.id
            JOIN room r ON st.room_id = r.id
            JOIN branch b ON r.branch_id = b.id
            JOIN area a ON b.area_id = a.id
            WHERE
                a.id = :#{#request.areaId} AND
                st.screening_date > CURRENT_DATE() AND
            (
                ( :#{#request.movieName} IS NULL OR m.name LIKE :#{ "%" + #request.movieName +"%" } ) AND
                ( :#{#request.branchId} IS NULL OR b.id LIKE :#{ "%" + #request.branchId +"%" } ) AND
                ( :#{#request.roomId} IS NULL OR r.id LIKE :#{ "%" + #request.roomId +"%" } )
            )
            ORDER BY st.created_at DESC
            """, nativeQuery = true)
//                AND st.screening_date >= CURRENT_DATE
    Page<AdminAreaShowTimeManagementListShowTimeResponse> getListSearchShowTime(Pageable pageable, AdminAreaShowTimeManagementListShowTimeRequest request);

    @Query(value = """
            SELECT  st.screening_date AS screeningDate,
                    st.time_start AS timeStart,
                    st.ticket_price AS ticketPrice,
                    r.id AS roomId,
                    b.id AS branchId,
                    a.id AS areaId,
                    CONCAT(m.id,"*",m.release_date) AS movieId
            FROM showtime st
            JOIN movie m ON st.movie_id = m.id
            JOIN room r ON st.room_id = r.id
            JOIN branch b ON r.branch_id = b.id
            JOIN area a ON b.area_id = a.id
            WHERE st.id = :id
            """, nativeQuery = true)
    AdminAreaShowTimeManagementGetOneResponse getOneShowTime(String id);

    @Query(value = """
            SELECT  st.id AS id,
                    st.screening_date AS screeningDate,
                    st.time_start AS timeStart,
                    st.ticket_price AS ticketPrice,
                    r.name AS room,
                    b.name AS branch,
                    a.name AS area,
                    m.name AS movie,
                    ( SELECT COUNT(*) FROM ticket_chair tc WHERE (tc.show_time_id = :id) AND tc.status = true) AS ticketBooked,
                    ( SELECT COUNT(*) FROM ticket_chair tc WHERE (tc.show_time_id = :id) AND tc.status = false) AS ticketNotBooked
            FROM showtime st
            JOIN movie m ON st.movie_id = m.id
            JOIN room r ON st.room_id = r.id
            JOIN branch b ON r.branch_id = b.id
            JOIN area a ON b.area_id = a.id
            WHERE st.id = :id
            """, nativeQuery = true)
    AdminAreaShowTimeManagementGetDetailResponse getDetailShowTime(String id);

    @Query(value = """
            SELECT  b.id AS id,
                    b.name AS name
            FROM branch b
            WHERE b.deleted = true AND b.area_id = :areaId
            """, nativeQuery = true)
    List<AdminAreaShowTimeManagementGetListBranchResponse> getListBranch(String areaId);

    @Query(value = """
            SELECT  r.id AS id,
                    r.name AS name
            FROM room r
            WHERE r.deleted = true AND r.branch_id = :branchId
            """, nativeQuery = true)
    List<AdminAreaShowTimeManagementGetListRoomResponse> getListRoom(String branchId);

    @Query(value = """
            SELECT  CONCAT(m.id,"*",m.release_date) AS id,
                    m.name AS name
            FROM movie m
            WHERE m.deleted = true AND m.release_date <= CURRENT_DATE()
            """, nativeQuery = true)
    List<AdminAreaShowTimeManagementGetListMovieResponse> getListMovieCurrentShowing();

    @Query(value = """
            SELECT  CONCAT(m.id,"*",m.release_date) AS id,
                    m.name AS name
            FROM movie m
            WHERE m.deleted = true AND m.release_date > CURRENT_DATE()
            """, nativeQuery = true)
    List<AdminAreaShowTimeManagementGetListMovieResponse> getListMoviePreTicket();

    @Query("""
            SELECT st FROM ShowTime st
            WHERE
                (st.screeningDate = :screeningDate) AND
                (st.timeStart = :timeStart) AND
                (st.roomId.id = :roomId) AND
                st.screeningDate >= CURRENT_DATE
            """)
    Optional<ShowTime> isShowTimeDuplicate(LocalDate screeningDate, Time timeStart, String roomId);

}
