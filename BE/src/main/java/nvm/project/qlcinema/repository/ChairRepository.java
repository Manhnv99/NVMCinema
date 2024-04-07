package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.Chair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChairRepository extends JpaRepository<Chair,String> {
}
