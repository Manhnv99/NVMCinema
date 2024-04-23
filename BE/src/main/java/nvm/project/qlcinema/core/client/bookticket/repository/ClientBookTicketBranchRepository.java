package nvm.project.qlcinema.core.client.bookticket.repository;

import nvm.project.qlcinema.core.client.bookticket.model.response.ClientBookTicketListBranchResponse;
import nvm.project.qlcinema.repository.BranchRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientBookTicketBranchRepository extends BranchRepository {

    @Query(value = """
                SELECT  b.id AS id,
                        b.name AS name,
                        b.address AS address
                FROM branch b
                WHERE b.area_id = :areaId
                """,nativeQuery = true)
    List<ClientBookTicketListBranchResponse> getListBranch(String areaId);

}
