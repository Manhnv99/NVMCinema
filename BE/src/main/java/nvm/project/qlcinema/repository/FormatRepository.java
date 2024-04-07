package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.Format;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormatRepository extends JpaRepository<Format,String> {
}
