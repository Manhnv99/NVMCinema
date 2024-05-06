package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListFormatResponse;
import nvm.project.qlcinema.repository.FormatRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleCounterManagementFormatRepository extends FormatRepository {

    @Query(value = """
            SELECT  f.id AS id,
                    f.name AS name
            FROM format f
            WHERE f.deleted = true
            """, nativeQuery = true)
    List<SaleCounterManagementListFormatResponse> getListFormat();

}
