package nvm.project.qlcinema.core.admin.moviemanagement.repository;

import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListCountryResponse;
import nvm.project.qlcinema.entity.Country;
import nvm.project.qlcinema.repository.CountryRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminMovieManagementCountryRepository extends CountryRepository {

    @Query(value = """
                SELECT  c.id AS id,
                        c.name AS name
                FROM country c
                WHERE c.deleted = true
                """,nativeQuery = true)
    List<AdminMovieManagementListCountryResponse> getListCountry();

}
