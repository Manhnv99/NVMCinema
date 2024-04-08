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
import java.time.LocalDate;
import java.util.Date;

/**
 * @author Manhnv99
 */

/**
 *  Object PromotionEvent sẽ là các sự kiện giảm giá , có các mã giảm giá cho người dùng.
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "promotion_event")
public class PromotionEvent extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "date_start")
    private LocalDate dateStart;

    @Column(name = "date_end")
    private LocalDate dateEnd;

    @Column(name = "promotion_code")
    private String promotionCode;

    @Column(name = "promotion_price")
    private BigDecimal promotionPrice;

    @Column(name = "description")
    private String description;

    @Column(name = "image_id")
    private String imageId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_at")
    private Date createdAt;

}
