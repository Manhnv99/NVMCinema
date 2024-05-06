package nvm.project.qlcinema.core.admin.branchmanagement.repository;

import nvm.project.qlcinema.core.admin.branchmanagement.model.request.AdminBranchManagementListBranchRequest;
import nvm.project.qlcinema.core.admin.branchmanagement.model.response.AdminBranchManagementGetOneResponse;
import nvm.project.qlcinema.core.admin.branchmanagement.model.response.AdminBranchManagementListBranchResponse;
import nvm.project.qlcinema.entity.Branch;
import nvm.project.qlcinema.repository.BranchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminBranchManagementRepository extends BranchRepository {

    @Query("""
            SELECT b FROM Branch b ORDER BY b.createdAt DESC LIMIT 1
            """)
    Optional<Branch> getNewest();

    @Query("""
            SELECT b FROM Branch b WHERE (b.name = :name AND b.email = :email AND b.address = :address  AND b.hostLine = :hostLine) AND b.areaId.id = :areaId
            """)
    Optional<Branch> isBranchExist(String name, String email, String address, String hostLine, String areaId);

    @Query(value = """
            SELECT  b.id AS id,
                    b.code AS code,
                    b.name AS name,
                    b.email AS email,
                    b.address AS address,
                    b.hostline AS hostline,
                    b.image_url AS image,
                    a.name AS area,
                    b.deleted AS deleted
            FROM branch b
            JOIN area a ON b.area_id = a.id
            WHERE
            (
                ( :#{#request.inputSearch} IS NULL OR b.code LIKE :#{ "%" + #request.inputSearch + "%" } ) OR
                ( :#{#request.inputSearch} IS NULL OR b.name LIKE :#{ "%" + #request.inputSearch + "%" } ) OR
                ( :#{#request.inputSearch} IS NULL OR b.email LIKE :#{ "%" + #request.inputSearch + "%" } ) OR
                ( :#{#request.inputSearch} IS NULL OR b.address LIKE :#{ "%" + #request.inputSearch + "%" } ) OR
                ( :#{#request.inputSearch} IS NULL OR b.hostline LIKE :#{ "%" + #request.inputSearch + "%" } )
            )
            AND
            ( :#{#request.areaId} IS NULL OR a.id LIKE :#{ "%"+ #request.areaId +"%" } )
            ORDER BY b.created_at DESC
            """, nativeQuery = true)
    Page<AdminBranchManagementListBranchResponse> getListBranch(Pageable pageable, AdminBranchManagementListBranchRequest request);

    @Query(value = """
            SELECT  b.id AS id,
                    b.code AS code,
                    b.name AS name,
                    b.email AS email,
                    b.address AS address,
                    b.hostline AS hostline,
                    b.image_url AS image,
                    a.id AS areaId,
                    b.deleted AS deleted
            FROM branch b
            JOIN area a ON b.area_id = a.id
            WHERE b.id = :id
            """, nativeQuery = true)
    AdminBranchManagementGetOneResponse getOneBranch(String id);

    @Query(value = """
            SELECT  b.id AS id,
                    b.code AS code,
                    b.name AS name,
                    b.email AS email,
                    b.address AS address,
                    b.hostline AS hostline,
                    b.image_url AS image,
                    a.name AS area,
                    b.deleted AS deleted
            FROM branch b
            JOIN area a ON b.area_id = a.id
            WHERE b.id = :id
            """, nativeQuery = true)
    AdminBranchManagementListBranchResponse getDetailBranch(String id);

}
