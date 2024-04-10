package nvm.project.qlcinema.core.admin.formatmanagement.repository;

import nvm.project.qlcinema.core.admin.formatmanagement.model.request.AdminFormatManagementListFormatRequest;
import nvm.project.qlcinema.core.admin.formatmanagement.model.response.AdminFormatManagementListFormatResponse;
import nvm.project.qlcinema.entity.Format;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminFormatManagementRepository extends JpaRepository<Format,String> {

    @Query("""
            SELECT f FROM Format f ORDER BY f.createdAt DESC LIMIT 1
            """)
    Optional<Format> getNewest();

    Optional<Format> findByName(String name);

    @Query(value = """
                SELECT  m.id AS id,
                        m.code AS code,
                        m.name AS name,
                        m.deleted AS deleted
                FROM format m
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR m.code LIKE :#{ "%" + #request.inputSearch +"%"} ) OR
                    ( :#{#request.inputSearch} IS NULL OR m.name LIKE :#{ "%" + #request.inputSearch +"%"} )
                )
                """,nativeQuery = true)
    Page<AdminFormatManagementListFormatResponse> getListFormat(Pageable pageable, AdminFormatManagementListFormatRequest request);

    @Query(value = """
                SELECT  m.id AS id,
                        m.code AS code,
                        m.name AS name,
                        m.deleted AS deleted
                FROM format m
                WHERE m.id = :formatId
                """,nativeQuery = true)
    AdminFormatManagementListFormatResponse getDetailFormat(String formatId);

}
