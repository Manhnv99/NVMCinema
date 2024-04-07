package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RateRepository extends JpaRepository<Rate,String> {
}
