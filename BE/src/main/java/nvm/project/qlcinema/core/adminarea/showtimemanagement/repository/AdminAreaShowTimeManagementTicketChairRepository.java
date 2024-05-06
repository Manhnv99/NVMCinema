package nvm.project.qlcinema.core.adminarea.showtimemanagement.repository;

import nvm.project.qlcinema.core.adminarea.showtimemanagement.model.response.AdminAreaShowTimeManagementGetListTicketChairResponse;
import nvm.project.qlcinema.repository.TicketChairRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminAreaShowTimeManagementTicketChairRepository extends TicketChairRepository {

    @Query(value = """
            SELECT  tc.id AS id,
                    tc.chair_name AS name,
                    tc.status AS status
            FROM ticket_chair tc
            WHERE tc.show_time_id = :showTimeId
            ORDER BY tc.created_at ASC
            """, nativeQuery = true)
    List<AdminAreaShowTimeManagementGetListTicketChairResponse> getListTicketChair(String showTimeId);

}
