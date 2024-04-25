package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.OrderDetailFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailFoodRepository extends JpaRepository<OrderDetailFood,String> {
}
