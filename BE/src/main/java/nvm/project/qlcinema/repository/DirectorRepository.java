package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepository extends JpaRepository<Director, String> {
}
