package nvm.project.qlcinema.core.client.bookchair.repository;

import nvm.project.qlcinema.entity.PromotionEvent;
import nvm.project.qlcinema.repository.PromotionEventRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientBookChairPromotionEventRepository extends PromotionEventRepository {

    @Query("""
            SELECT pme FROM PromotionEvent pme WHERE pme.promotionCode = :code
            """)
    Optional<PromotionEvent> getPromotionEventByCode(String code);

}
