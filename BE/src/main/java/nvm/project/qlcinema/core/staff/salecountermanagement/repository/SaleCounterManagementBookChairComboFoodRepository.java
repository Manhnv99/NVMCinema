package nvm.project.qlcinema.core.staff.salecountermanagement.repository;

import nvm.project.qlcinema.core.staff.salecountermanagement.model.response.SaleCounterManagementBookChairListComboFoodResponse;
import nvm.project.qlcinema.repository.ComboFoodRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleCounterManagementBookChairComboFoodRepository extends ComboFoodRepository {

    @Query(value = """
            SELECT  cf.id AS id,
                    cf.name AS name,
                    cf.price AS price,
                    cf.image_url AS imageUrl
            FROM combo_food cf
            WHERE cf.deleted = true
            ORDER BY cf.created_at ASC
            """, nativeQuery = true)
    List<SaleCounterManagementBookChairListComboFoodResponse> getListComboFood();

}
