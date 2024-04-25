package nvm.project.qlcinema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nvm.project.qlcinema.entity.base.PrimaryEntity;
import nvm.project.qlcinema.infrastructure.constant.FormalityOrder;
import nvm.project.qlcinema.infrastructure.constant.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

/**
 * @author Manhnv99
 */

/**
 *  Object Order là các hóa đơn mà người dùng đặt showtime
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "formality")
    private FormalityOrder formality;

    @ManyToOne
    @JoinColumn(name = "promotion_event_id",referencedColumnName = "id")
    private PromotionEvent promotionEventId;

    @ManyToOne
    @JoinColumn(name = "combo_food_id",referencedColumnName = "id")
    private ComboFood comboFoodId;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "client_id",referencedColumnName = "id")
    private Client clientId;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "order_status")
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus; //khi đơn quá thời gian mà trạng thái là chưa duyệt thì sẽ tự động thành đã hủy

}
