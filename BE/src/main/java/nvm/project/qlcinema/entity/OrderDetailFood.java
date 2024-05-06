package nvm.project.qlcinema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nvm.project.qlcinema.entity.base.PrimaryEntity;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order_detail_combofood")
public class OrderDetailFood extends PrimaryEntity {

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order orderId;

    @ManyToOne
    @JoinColumn(name = "combo_food_id", referencedColumnName = "id")
    private ComboFood comboFoodId;

    @Column(name = "quantity")
    private int quantity;

}
