package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, String> {
}
