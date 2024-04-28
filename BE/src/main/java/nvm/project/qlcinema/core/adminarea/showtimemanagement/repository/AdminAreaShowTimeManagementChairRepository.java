package nvm.project.qlcinema.core.adminarea.showtimemanagement.repository;

import nvm.project.qlcinema.entity.Chair;
import nvm.project.qlcinema.repository.ChairRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminAreaShowTimeManagementChairRepository extends ChairRepository {

    @Query("""
            SELECT c FROM Chair c WHERE c.roomId.id = :roomId ORDER BY c.createdAt ASC
            """)
    List<Chair> getListChairByRoom(String roomId);

}
