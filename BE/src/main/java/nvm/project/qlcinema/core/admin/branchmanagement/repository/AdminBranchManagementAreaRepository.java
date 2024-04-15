package nvm.project.qlcinema.core.admin.branchmanagement.repository;

import nvm.project.qlcinema.core.admin.branchmanagement.model.response.AdminBranchManagementListAreaResponse;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.repository.AreaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminBranchManagementAreaRepository extends AreaRepository {

    @Query(value = """
                SELECT  a.id AS id,
                        a.name AS name
                FROM area a
                WHERE a.deleted = true
                """,nativeQuery = true)
    List<AdminBranchManagementListAreaResponse> getListArea();

}
