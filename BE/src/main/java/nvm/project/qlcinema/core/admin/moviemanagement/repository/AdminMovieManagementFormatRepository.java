package nvm.project.qlcinema.core.admin.moviemanagement.repository;

import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListFormatResponse;
import nvm.project.qlcinema.entity.Format;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminMovieManagementFormatRepository extends JpaRepository<Format,String> {

    @Query(value = """
                SELECT  f.id AS id,
                        f.name AS name
                FROM format f
                WHERE f.deleted = true
                """,nativeQuery = true)
    List<AdminMovieManagementListFormatResponse> getListFormat();

}
