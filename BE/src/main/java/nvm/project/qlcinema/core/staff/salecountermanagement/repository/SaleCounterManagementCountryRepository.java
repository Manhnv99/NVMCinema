package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListCountryResponse;
import nvm.project.qlcinema.repository.CountryRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleCounterManagementCountryRepository extends CountryRepository {

    @Query(value = """
            SELECT  c.id AS id,
                    c.name AS name
            FROM country c
            WHERE c.deleted = true
            """, nativeQuery = true)
    List<SaleCounterManagementListCountryResponse> getListCountry();

}
