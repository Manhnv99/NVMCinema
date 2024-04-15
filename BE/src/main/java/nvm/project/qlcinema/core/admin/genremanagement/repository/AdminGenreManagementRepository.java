package nvm.project.qlcinema.core.admin.genremanagement.repository;

import nvm.project.qlcinema.core.admin.genremanagement.model.request.AdminGenreManagementListGenreRequest;
import nvm.project.qlcinema.core.admin.genremanagement.model.response.AdminGenreManagementListGenreResponse;
import nvm.project.qlcinema.entity.Genre;
import nvm.project.qlcinema.repository.GenreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminGenreManagementRepository extends GenreRepository {

    @Query("""
            SELECT g FROM Genre g ORDER BY g.createdAt DESC LIMIT 1
            """)
    Optional<Genre> getNewest();

    Optional<Genre> findByName(String name);

    @Query(value = """
                SELECT  g.id AS id,
                        g.code AS code,
                        g.name AS name,
                        g.deleted AS deleted
                FROM genre g
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR g.code LIKE :#{ "%" + #request.inputSearch +"%"} ) OR
                    ( :#{#request.inputSearch} IS NULL OR g.name LIKE :#{ "%" + #request.inputSearch +"%"} )
                )
                """,nativeQuery = true)
    Page<AdminGenreManagementListGenreResponse> getListGenre(Pageable pageable, AdminGenreManagementListGenreRequest request);

    @Query(value = """
                SELECT  g.id AS id,
                        g.code AS code,
                        g.name AS name,
                        g.deleted AS deleted
                FROM genre g
                WHERE g.id = :genreId
                """,nativeQuery = true)
    AdminGenreManagementListGenreResponse getDetailGenre(String genreId);

}
