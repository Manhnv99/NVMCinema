package nvm.project.qlcinema.core.admin.roommanagement.repository;

import nvm.project.qlcinema.repository.ChairRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AdminRoomManagementChairRepository extends ChairRepository {

    @Modifying
    @Transactional
    @Query("""
            DELETE FROM Chair c WHERE c.roomId.id = :roomId
            """)
    void deleteByRoomId(String roomId);

}
