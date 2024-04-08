package nvm.project.qlcinema.core.admin.staffmanagement.repository;

import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminManagementGetDetailStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminManagementGetOneStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminManagementListStaffResponse;
import nvm.project.qlcinema.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminManagementStaffRepository extends UserRepository {

    @Query(value = """
                SELECT 	u.id AS id,
                        u.code AS code,
                		u.name AS name,
                		u.cccd AS cccd,
                		u.gender AS gender,
                		u.birthday AS birthday,
                		u.email AS email,
                		u.phone_number AS phone,
                		u.address AS address,
                		u.role AS role,
                		u.status AS status,
                		a.name AS areaName
                FROM `user` u
                JOIN area a on u.area_id = a.id
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR u.code LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                    (:#{#request.inputSearch} IS NULL OR u.name LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                    (:#{#request.inputSearch} IS NULL OR u.cccd LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                    (:#{#request.inputSearch} IS NULL OR u.email LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                    (:#{#request.inputSearch} IS NULL OR u.phone_number LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                    (:#{#request.inputSearch} IS NULL OR a.name LIKE :#{"%" + #request.inputSearch + "%"} )
                )
                """,nativeQuery = true)
    Page<AdminManagementListStaffResponse> getListStaff(Pageable pageable, AdminManagementListStaffRequest request);

    @Query(value = """
                SELECT 	u.id AS id,
                        u.code AS code,
                		u.name AS name,
                		u.cccd AS cccd,
                		u.gender AS gender,
                		u.birthday AS birthday,
                		u.email AS email,
                		u.phone_number AS phone,
                		u.address AS address,
                		u.role AS role,
                		u.status AS status,
                		a.id AS areaId,
                		u.image_url AS imageUrl
                FROM `user` u
                JOIN area a on u.area_id = a.id
                WHERE u.id = :userId
                """,nativeQuery = true)
    AdminManagementGetOneStaffResponse getOneStaff(String userId);

    @Query(value = """
                SELECT 	u.id AS id,
                        u.code AS code,
                		u.name AS name,
                		u.cccd AS cccd,
                		u.gender AS gender,
                		u.birthday AS birthday,
                		u.email AS email,
                		u.phone_number AS phone,
                		u.address AS address,
                		u.role AS role,
                		u.status AS status,
                		a.name AS areaName
                FROM `user` u
                JOIN area a on u.area_id = a.id
                WHERE u.id = :userId
                """,nativeQuery = true)
    AdminManagementGetDetailStaffResponse getDetailStaff(String userId);

}
