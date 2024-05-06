package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.Chair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChairRepository extends JpaRepository<Chair, String> {

    @Query("""
            SELECT c FROM Chair c ORDER BY c.createdAt DESC LIMIT 1
            """)
    Optional<Chair> getNewest();

}
