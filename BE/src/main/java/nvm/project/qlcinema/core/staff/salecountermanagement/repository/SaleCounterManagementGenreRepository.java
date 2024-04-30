package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementListGenreResponse;
import nvm.project.qlcinema.repository.GenreRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleCounterManagementGenreRepository extends GenreRepository {

    @Query(value = """
                SELECT  g.id AS id,
                        g.name AS name
                FROM genre g
                WHERE g.deleted = true
                """,nativeQuery = true)
    List<SaleCounterManagementListGenreResponse> getListGenre();

}
