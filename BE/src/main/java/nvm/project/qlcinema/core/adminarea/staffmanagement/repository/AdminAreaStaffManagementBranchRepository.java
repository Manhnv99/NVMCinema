package nvm.project.qlcinema.core.adminarea.staffmanagement.repository;

import nvm.project.qlcinema.core.adminarea.staffmanagement.model.response.AdminAreaStaffManagementBranchResponse;
import nvm.project.qlcinema.repository.BranchRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminAreaStaffManagementBranchRepository extends BranchRepository {

    @Query(value = """
            SELECT  b.id AS id,
                    b.name AS name
            FROM branch b
            JOIN area a ON a.id = b.area_id
            WHERE a.id = :areaId
            """, nativeQuery = true)
    List<AdminAreaStaffManagementBranchResponse> getListBranch(String areaId);

}
