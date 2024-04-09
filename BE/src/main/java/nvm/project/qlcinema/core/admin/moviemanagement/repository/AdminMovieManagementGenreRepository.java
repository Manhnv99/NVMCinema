package nvm.project.qlcinema.core.admin.moviemanagement.repository;

import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListGenreResponse;
import nvm.project.qlcinema.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminMovieManagementGenreRepository extends JpaRepository<Genre,String> {

    @Query(value = """
                SELECT  g.id AS id,
                        g.name AS name
                FROM genre g
                WHERE g.deleted = true
                """,nativeQuery = true)
    List<AdminMovieManagementListGenreResponse> getListGenre();

}
