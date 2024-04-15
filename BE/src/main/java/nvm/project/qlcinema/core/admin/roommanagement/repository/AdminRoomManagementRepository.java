package nvm.project.qlcinema.core.admin.roommanagement.repository;

import nvm.project.qlcinema.core.admin.roommanagement.model.request.AdminRoomManagementListRoomRequest;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementDetailRoomResponse;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementGetOneRoomResponse;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementListAreaResponse;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementListBranchResponse;
import nvm.project.qlcinema.core.admin.roommanagement.model.response.AdminRoomManagementListRoomResponse;
import nvm.project.qlcinema.entity.Room;
import nvm.project.qlcinema.repository.RoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRoomManagementRepository extends RoomRepository {

    @Query(value = """
                SELECT  r.id AS id,
                        r.code AS code,
                        r.name AS name,
                        b.name AS branch,
                        a.name AS area,
                        r.deleted AS deleted
                FROM room r
                JOIN branch b ON r.branch_id = b.id
                JOIN area a ON b.area_id = a.id
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR r.code LIKE :#{ "%" + #request.inputSearch +"%" } ) OR
                    ( :#{#request.inputSearch} IS NULL OR r.name LIKE :#{ "%" + #request.inputSearch +"%" } )
                )
                AND
                    ( :#{#request.branchId} IS NULL OR b.id LIKE :#{ "%" + #request.branchId +"%" } )
                """,nativeQuery = true)
    Page<AdminRoomManagementListRoomResponse> getListSearchRoom(Pageable pageable, AdminRoomManagementListRoomRequest request);

    @Query(value = """
                SELECT  r.id AS id,
                        r.code AS code,
                        r.name AS name,
                        b.id AS branchId,
                        (SELECT COUNT(*) FROM chair c WHERE c.room_id = :id) AS totalChair
                FROM room r
                JOIN branch b ON r.branch_id = b.id
                WHERE r.id = :id
                """,nativeQuery = true)
    AdminRoomManagementGetOneRoomResponse getOneRoom(String id);

    @Query(value = """
                SELECT  r.id AS id,
                        r.code AS code,
                        r.name AS name,
                        b.name AS branch,
                        a.name AS area,
                        (SELECT COUNT(*) FROM chair c WHERE c.room_id = :id) AS totalChair,
                        r.deleted AS deleted
                FROM room r
                JOIN branch b ON r.branch_id = b.id
                JOIN area a ON b.area_id = a.id
                WHERE r.id = :id
                """,nativeQuery = true)
    AdminRoomManagementDetailRoomResponse getDetailRoom(String id);

    @Query(value = """
                SELECT  a.id AS id,
                        a.name AS name
                FROM area a
                WHERE a.deleted = true
                """,nativeQuery = true)
    List<AdminRoomManagementListAreaResponse> getListArea();

    @Query(value = """
                SELECT  b.id AS id,
                        b.name AS name
                FROM branch b
                WHERE
                b.deleted = true AND b.area_id = :areaId
                """,nativeQuery = true)
    List<AdminRoomManagementListBranchResponse> getListBranch(String areaId);

    @Query("""
            SELECT r FROM Room r ORDER BY r.createdAt DESC LIMIT 1
            """)
    Optional<Room> getNewest();

    Optional<Room> findRoomByName(String name);

}
