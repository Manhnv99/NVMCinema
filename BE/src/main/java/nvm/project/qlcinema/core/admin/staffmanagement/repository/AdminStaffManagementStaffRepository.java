package nvm.project.qlcinema.core.admin.staffmanagement.repository;

import nvm.project.qlcinema.core.admin.staffmanagement.model.request.AdminStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementGetDetailStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementGetOneStaffResponse;
import nvm.project.qlcinema.core.admin.staffmanagement.model.response.AdminStaffManagementListStaffResponse;
import nvm.project.qlcinema.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminStaffManagementStaffRepository extends UserRepository {

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
                FROM `users` u
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
    Page<AdminStaffManagementListStaffResponse> getListStaff(Pageable pageable, AdminStaffManagementListStaffRequest request);

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
                FROM `users` u
                JOIN area a on u.area_id = a.id
                WHERE u.id = :userId
                """,nativeQuery = true)
    AdminStaffManagementGetOneStaffResponse getOneStaff(String userId);

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
                FROM `users` u
                JOIN area a on u.area_id = a.id
                WHERE u.id = :userId
                """,nativeQuery = true)
    AdminStaffManagementGetDetailStaffResponse getDetailStaff(String userId);

}
