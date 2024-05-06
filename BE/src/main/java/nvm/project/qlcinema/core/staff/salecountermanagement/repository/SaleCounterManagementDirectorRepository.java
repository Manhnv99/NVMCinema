package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListDirectorResponse;
import nvm.project.qlcinema.repository.DirectorRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleCounterManagementDirectorRepository extends DirectorRepository {

    @Query(value = """
            SELECT  d.id AS id,
                    d.name AS name
            FROM director d
            WHERE d.deleted = true
            """, nativeQuery = true)
    List<SaleCounterManagementListDirectorResponse> getListDirector();

}
