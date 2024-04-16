package nvm.project.qlcinema.core.admin.showtimemanagement.repository;

import nvm.project.qlcinema.core.admin.showtimemanagement.model.response.AdminShowTimeManagementGetListTicketChairResponse;
import nvm.project.qlcinema.repository.TicketChairRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminShowTimeManagementTicketChairRepository extends TicketChairRepository {

    @Query(value = """
                SELECT  tc.id AS id,
                        tc.chair_name AS name,
                        tc.status AS status
                FROM ticket_chair tc
                WHERE tc.show_time_id = :showTimeId
                ORDER BY tc.create_at ASC
                """,nativeQuery = true)
    List<AdminShowTimeManagementGetListTicketChairResponse> getListTicketChair(String showTimeId);

}
