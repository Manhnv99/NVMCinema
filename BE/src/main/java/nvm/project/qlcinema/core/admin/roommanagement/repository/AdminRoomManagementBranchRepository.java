package nvm.project.qlcinema.core.admin.roommanagement.repository;

import nvm.project.qlcinema.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRoomManagementBranchRepository extends JpaRepository<Branch,String> {
}
