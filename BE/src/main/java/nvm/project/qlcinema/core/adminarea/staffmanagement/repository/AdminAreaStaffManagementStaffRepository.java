package nvm.project.qlcinema.core.adminarea.staffmanagement.repository;

import nvm.project.qlcinema.core.adminarea.staffmanagement.model.request.AdminAreaStaffManagementListStaffRequest;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.response.AdminAreaStaffManagementGetDetailStaffResponse;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.response.AdminAreaStaffManagementGetOneStaffResponse;
import nvm.project.qlcinema.core.adminarea.staffmanagement.model.response.AdminAreaStaffManagementListStaffResponse;
import nvm.project.qlcinema.entity.User;
import nvm.project.qlcinema.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminAreaStaffManagementStaffRepository extends UserRepository {

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
            		b.name AS branchName,
            		u.image_url AS imageUrl
            FROM `users` u
            JOIN area a ON u.area_id = a.id
            JOIN branch b ON b.id = u.branch_id 
            WHERE
                a.id = :#{#request.areaId} AND
                u.role = "ROLE_STAFF" AND
            (
                ( :#{#request.inputSearch} IS NULL OR u.code LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                (:#{#request.inputSearch} IS NULL OR u.name LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                (:#{#request.inputSearch} IS NULL OR u.cccd LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                (:#{#request.inputSearch} IS NULL OR u.email LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                (:#{#request.inputSearch} IS NULL OR u.phone_number LIKE :#{"%" + #request.inputSearch + "%"} ) OR
                (:#{#request.inputSearch} IS NULL OR a.name LIKE :#{"%" + #request.inputSearch + "%"} )
            )
            ORDER BY u.created_at DESC
            """, nativeQuery = true)
    Page<AdminAreaStaffManagementListStaffResponse> getListStaff(Pageable pageable, AdminAreaStaffManagementListStaffRequest request);

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
            		b.id AS branchId,
            		u.image_url AS imageUrl
            FROM `users` u
            JOIN area a ON u.area_id = a.id
            JOIN branch b ON b.id = u.branch_id
            WHERE u.id = :userId
            """, nativeQuery = true)
    AdminAreaStaffManagementGetOneStaffResponse getOneStaff(String userId);

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
            		b.name AS branchName
            FROM `users` u
            JOIN area a ON u.area_id = a.id
            JOIN branch b ON b.id = u.branch_id
            WHERE u.id = :userId
            """, nativeQuery = true)
    AdminAreaStaffManagementGetDetailStaffResponse getDetailStaff(String userId);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByCccd(String cccd);

    Optional<User> findUserByPhoneNumber(String phone);

}
