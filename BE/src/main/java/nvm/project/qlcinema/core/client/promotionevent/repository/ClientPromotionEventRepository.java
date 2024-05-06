package nvm.project.qlcinema.core.client.promotionevent.repository;

import nvm.project.qlcinema.core.client.promotionevent.model.response.ClientPromotionEventDetailPromotionEventResponse;
import nvm.project.qlcinema.core.client.promotionevent.model.response.ClientPromotionEventListPromotionEventResponse;
import nvm.project.qlcinema.repository.PromotionEventRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientPromotionEventRepository extends PromotionEventRepository {

    @Query(value = """
            SELECT  pe.id AS id,
                    pe.image_url AS image,
                    pe.name AS name,
                    pe.date_start AS dateStart,
                    pe.date_end AS dateEnd
            FROM promotion_event pe
            """, nativeQuery = true)
    List<ClientPromotionEventListPromotionEventResponse> getListPromotionEvent();

    @Query(value = """
            SELECT  pe.image_url AS image,
                    pe.promotion_code AS promotionCode,
                    pe.name AS name,
                    pe.date_start AS dateStart,
                    pe.date_end AS dateEnd,
                    pe.description AS description
            FROM promotion_event pe
            WHERE pe.id = :peId
            """, nativeQuery = true)
    ClientPromotionEventDetailPromotionEventResponse getDetailPromotionEvent(String peId);

}
