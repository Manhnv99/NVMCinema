package nvm.project.qlcinema.core.admin.promotioneventmanagement.repository;

import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.request.AdminPromotionEventManagementListPromotionEventRequest;
import nvm.project.qlcinema.core.admin.promotioneventmanagement.model.response.AdminPromotionEventManagementListPromotionEventResponse;
import nvm.project.qlcinema.entity.PromotionEvent;
import nvm.project.qlcinema.infrastructure.constant.PromotionEventStatus;
import nvm.project.qlcinema.repository.PromotionEventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface AdminPromotionEventManagementRepository extends PromotionEventRepository {

    @Query(value = """
                SELECT  pe.id AS Id,
                        pe.code AS code,
                        pe.name AS name,
                        pe.date_start AS dateStart,
                        pe.date_end AS dateEnd,
                        pe.promotion_code AS promotionCode,
                        pe.promotion_price AS promotionPrice,
                        pe.description AS description,
                        pe.image_url AS imageUrl,
                        pe.status AS status
                FROM promotion_event pe
                WHERE
                (
                    ( :#{#request.name} IS NULL OR pe.name LIKE :#{ "%" + #request.name +"%" } ) AND
                    ( :#{#request.timeStart} OR :#{#request.timeEnd} ) IS NULL OR ( :#{#request.timeStart} <= pe.date_start AND :#{#request.timeEnd} >= pe.date_start )
                )
                """,nativeQuery = true)
    Page<AdminPromotionEventManagementListPromotionEventResponse> getListSearchPromotionEvent(
            Pageable pageable,
            AdminPromotionEventManagementListPromotionEventRequest request
    );

    @Query(value = """
                SELECT  pe.id AS Id,
                        pe.code AS code,
                        pe.name AS name,
                        pe.date_start AS dateStart,
                        pe.date_end AS dateEnd,
                        pe.promotion_code AS promotionCode,
                        pe.promotion_price AS promotionPrice,
                        pe.description AS description,
                        pe.image_url AS imageUrl,
                        pe.status AS status
                FROM promotion_event pe
                WHERE pe.id = :id
                """,nativeQuery = true)
    AdminPromotionEventManagementListPromotionEventResponse getDetailPromotionEvent(String id);

    Optional<PromotionEvent> findPromotionEventByName(String name);

    @Query("""
            SELECT pe FROM PromotionEvent pe ORDER BY pe.createdAt DESC LIMIT 1
            """)
    Optional<PromotionEvent> getNewest();

    @Modifying
    @Transactional
    @Query("""
            UPDATE PromotionEvent pe SET pe.promotionEventStatus = :promotionEventStatus WHERE pe.id = :id
            """)
    void updatePEStatus(PromotionEventStatus promotionEventStatus,String id);

}
