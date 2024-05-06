package nvm.project.qlcinema.core.admin.statisticsmanagement.repository;

import nvm.project.qlcinema.core.admin.statisticsmanagement.model.response.AdminStatisticsManagementGetAreaResponse;
import nvm.project.qlcinema.repository.AreaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminStatisticsManagementAreaRepository extends AreaRepository {

    @Query(value = """
            SELECT  a.id AS id,
                    a.name AS name
            FROM area a
            WHERE a.deleted = true
            """, nativeQuery = true)
    List<AdminStatisticsManagementGetAreaResponse> getAllArea();

}
