package nvm.project.qlcinema.core.admin.countrymanagement.repository;

import nvm.project.qlcinema.core.admin.countrymanagement.model.request.AdminCountryManagementListCountryRequest;
import nvm.project.qlcinema.core.admin.countrymanagement.model.response.AdminCountryManagementListCountryResponse;
import nvm.project.qlcinema.entity.Country;
import nvm.project.qlcinema.repository.CountryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminCountryManagementRepository extends CountryRepository {

    @Query("""
            SELECT f FROM Country f ORDER BY f.createdAt DESC LIMIT 1
            """)
    Optional<Country> getNewest();

    Optional<Country> findByName(String name);

    @Query(value = """
                SELECT  c.id AS id,
                        c.code AS code,
                        c.name AS name,
                        c.deleted AS deleted
                FROM country c
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR c.code LIKE :#{ "%" + #request.inputSearch +"%"} ) OR
                    ( :#{#request.inputSearch} IS NULL OR c.name LIKE :#{ "%" + #request.inputSearch +"%"} )
                )
                ORDER BY c.created_at DESC
                """,nativeQuery = true)
    Page<AdminCountryManagementListCountryResponse> getListCountry(Pageable pageable, AdminCountryManagementListCountryRequest request);

    @Query(value = """
                SELECT  c.id AS id,
                        c.code AS code,
                        c.name AS name,
                        c.deleted AS deleted
                FROM country c
                WHERE c.id = :countryId
                """,nativeQuery = true)
    AdminCountryManagementListCountryResponse getDetailCountry(String countryId);

}
