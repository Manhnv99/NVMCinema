package nvm.project.qlcinema.core.admin.combofoodmanagement.repository;

import nvm.project.qlcinema.core.admin.combofoodmanagement.model.request.AdminComboFoodManagementListComboFoodRequest;
import nvm.project.qlcinema.core.admin.combofoodmanagement.model.response.AdminComboFoodManagementListComboFoodResponse;
import nvm.project.qlcinema.entity.ComboFood;
import nvm.project.qlcinema.repository.ComboFoodRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminComboFoodManagementRepository extends ComboFoodRepository {

    @Query("""
            SELECT cb FROM ComboFood cb ORDER BY cb.createdAt DESC LIMIT 1
            """)
    Optional<ComboFood> getNewest();

    Optional<ComboFood> findByName(String name);

    @Query(value = """
                SELECT  cf.id AS id,
                        cf.code AS code,
                        cf.name AS name,
                        cf.image_url AS imageUrl,
                        cf.price AS price,
                        cf.deleted AS deleted
                FROM combo_food cf
                WHERE
                (
                    ( :#{#request.inputSearch} IS NULL OR cf.code LIKE :#{ "%" + #request.inputSearch + "%" } ) OR
                    ( :#{#request.inputSearch} IS NULL OR cf.name LIKE :#{ "%" + #request.inputSearch + "%" } )
                )
                """,nativeQuery = true)
    Page<AdminComboFoodManagementListComboFoodResponse> getListComboFood(Pageable pageable, AdminComboFoodManagementListComboFoodRequest request);

    @Query(value = """
                SELECT  cf.id AS id,
                        cf.code AS code,
                        cf.name AS name,
                        cf.image_url AS imageUrl,
                        cf.price AS price,
                        cf.deleted AS deleted
                FROM combo_food cf
                WHERE cf.id = :comboFoodId
                """,nativeQuery = true)
    AdminComboFoodManagementListComboFoodResponse getDetailComboFood(String comboFoodId);

}
