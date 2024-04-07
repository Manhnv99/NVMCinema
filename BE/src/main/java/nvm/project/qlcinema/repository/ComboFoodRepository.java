package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.ComboFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComboFoodRepository extends JpaRepository<ComboFood,String> {
}
