package nvm.project.qlcinema.core.admin.areamanagement.repository;

import nvm.project.qlcinema.core.admin.areamanagement.model.request.AdminAreaManagementListAreaRequest;
import nvm.project.qlcinema.core.admin.areamanagement.model.response.AdminAreaManagementListAreaResponse;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.repository.AreaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminAreaManagementRepository extends AreaRepository {

    @Query("""
            SELECT a FROM Area a ORDER BY a.createdAt DESC LIMIT 1
            """)
    Optional<Area> getNewest();

    Optional<Area> findByName(String name);

    @Query(value = """
                SELECT  a.id AS id,
                        a.code AS code,
                        a.name AS name,
                        a.deleted AS deleted
                FROM area a
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR a.code LIKE :#{ "%" + #request.inputSearch + "%" } ) OR
                    ( :#{#request.inputSearch} IS NULL OR a.name LIKE :#{ "%" + #request.inputSearch + "%" } )
                )
                """,nativeQuery = true)
    Page<AdminAreaManagementListAreaResponse> getListArea(Pageable pageable, AdminAreaManagementListAreaRequest request);

    @Query(value = """
                SELECT  a.id AS id,
                        a.code AS code,
                        a.name AS name,
                        a.deleted AS deleted
                FROM area a
                WHERE a.id = :areaId
                """,nativeQuery = true)
    AdminAreaManagementListAreaResponse getDetailArea(String areaId);

}
