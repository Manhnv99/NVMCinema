package nvm.project.qlcinema.core.client.cinemasystem.repository;

import nvm.project.qlcinema.core.client.cinemasystem.model.response.ClientCinemaSystemDetailBranchResponse;
import nvm.project.qlcinema.core.client.cinemasystem.model.response.ClientCinemaSystemListBranchResponse;
import nvm.project.qlcinema.repository.BranchRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientCinemaSystemRepository extends BranchRepository {

    @Query(value = """
            SELECT  b.id AS id,
                    b.image_url AS image,
                    b.name AS name
            FROM branch b
            WHERE b.deleted = true
            """,nativeQuery = true)
    List<ClientCinemaSystemListBranchResponse> getListCinemaSystem();

    @Query(value = """
                SELECT  b.name AS name,
                        b.address AS address,
                        b.hostline AS hostLine,
                        b.email AS email,
                        b.image_url AS image,
                        (select COUNT(*) FROM room r WHERE r.branch_id = :branchId) AS totalRoom
                FROM branch b
                WHERE b.id = :branchId
                """,nativeQuery = true)
    ClientCinemaSystemDetailBranchResponse getDetailCinema(String branchId);

}
