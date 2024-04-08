package nvm.project.qlcinema.core.admin.staffmanagement.repository;

import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementAreaResponse;
import nvm.project.qlcinema.repository.AreaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminStaffManagementAreaRepository extends AreaRepository {

    @Query(value = """
                SELECT  a.id AS id,
                        a.name AS name
                FROM area a
                """,nativeQuery = true)
    List<AdminStaffManagementAreaResponse> getListArea();

}
