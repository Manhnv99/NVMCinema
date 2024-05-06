package nvm.project.qlcinema.core.client.bookchair.repository;

import nvm.project.qlcinema.core.client.bookchair.model.response.ClientBookChairListComboFoodResponse;
import nvm.project.qlcinema.repository.ComboFoodRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientBookChairComboFoodRepository extends ComboFoodRepository {

    @Query(value = """
            SELECT  cf.id AS id,
                    cf.name AS name,
                    cf.price AS price,
                    cf.image_url AS imageUrl
            FROM combo_food cf
            WHERE cf.deleted = true
            ORDER BY cf.created_at ASC
            """, nativeQuery = true)
    List<ClientBookChairListComboFoodResponse> getListComboFood();

}
