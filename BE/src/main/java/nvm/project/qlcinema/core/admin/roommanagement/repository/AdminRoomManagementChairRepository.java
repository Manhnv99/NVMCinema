package nvm.project.qlcinema.core.admin.roommanagement.repository;

import nvm.project.qlcinema.entity.Chair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRoomManagementChairRepository extends JpaRepository<Chair,String> {
}
