package nvm.project.qlcinema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nvm.project.qlcinema.entity.base.PrimaryEntity;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Manhnv99
 */

/**
 *  Object ComboFood sẽ là các combo đồ ăn mà người dùng chọn sau khi đã chọn ghế!
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "combo_food")
public class ComboFood extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_at")
    private Date createdAt;

}
