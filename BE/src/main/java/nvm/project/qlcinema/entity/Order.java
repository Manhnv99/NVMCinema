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
import nvm.project.qlcinema.infrastructure.constant.FormalityOrder;

import java.math.BigDecimal;
import java.time.LocalDate;

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
@Table(name = "director")
public class Order extends PrimaryEntity {

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "formality")
    private FormalityOrder formality;

    @ManyToOne
    @JoinColumn(name = "ticket_chair_id",referencedColumnName = "id")
    private TicketChair ticketChairId;

    @ManyToOne
    @JoinColumn(name = "promotion_event_id",referencedColumnName = "id")
    private PromotionEvent promotionEventId;

    @ManyToOne
    @JoinColumn(name = "combo_food_id",referencedColumnName = "id")
    private ComboFood comboFoodId;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User userId;

}
