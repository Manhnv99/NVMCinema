package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.PromotionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionEventRepository extends JpaRepository<PromotionEvent,String> {
}
