package nvm.project.qlcinema.core.admin.directormanagement.repository;

import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementListDirectorRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.request.AdminDirectorManagementPostDirectorRequest;
import nvm.project.qlcinema.core.admin.directormanagement.model.response.AdminDirectorManagementListDirectorResponse;
import nvm.project.qlcinema.entity.Director;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminDirectorManagementRepository extends JpaRepository<Director,String> {

    @Query("""
            SELECT d FROM Director d
            ORDER BY d.createdAt DESC LIMIT 1
            """)
    Optional<Director> getNewest();

    @Query("""
                SELECT d FROM Director d
                WHERE
                (
                    d.name = :#{ #postRequest.name } AND
                    d.age = :#{ #postRequest.age } AND
                    d.gender = :#{ #postRequest.gender } AND
                    d.description = :#{ #postRequest.description }
                )
            """)
    Optional<Director> isDirectorExist(AdminDirectorManagementPostDirectorRequest postRequest);

    @Query(value = """
                SELECT  d.id AS id,
                        d.code AS code,
                        d.name AS name,
                        d.gender AS gender,
                        d.age AS age,
                        d.description AS description,
                        d.deleted AS deleted
                FROM director d
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR d.code LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                    ( :#{#request.inputSearch} IS NULL OR d.name LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                    ( :#{#request.inputSearch} IS NULL OR d.age LIKE :#{"%" + #request.inputSearch + "%"} ) 
                )
                """,nativeQuery = true)
    Page<AdminDirectorManagementListDirectorResponse> getListDirector(Pageable pageable, AdminDirectorManagementListDirectorRequest request);

    @Query(value = """
                SELECT  d.id AS id,
                        d.code AS code,
                        d.name AS name,
                        d.gender AS gender,
                        d.age AS age,
                        d.description AS description,
                        d.deleted AS deleted
                FROM director d
                WHERE d.id = :directorId
            """,nativeQuery = true)
    AdminDirectorManagementListDirectorResponse getDetailDirector(String directorId);

}
