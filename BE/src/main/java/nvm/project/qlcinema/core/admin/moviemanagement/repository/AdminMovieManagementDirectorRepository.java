package nvm.project.qlcinema.core.admin.moviemanagement.repository;

import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListDirectorResponse;
import nvm.project.qlcinema.entity.Director;
import nvm.project.qlcinema.repository.DirectorRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminMovieManagementDirectorRepository extends DirectorRepository {

    @Query(value = """
                SELECT  d.id AS id,
                        d.name AS name
                FROM director d
                WHERE d.deleted = true
                """,nativeQuery = true)
    List<AdminMovieManagementListDirectorResponse> getListDirector();

}
