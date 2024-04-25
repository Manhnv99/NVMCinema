package nvm.project.qlcinema.entity;

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
@Table(name = "order_detail")
public class OrderDetail extends PrimaryEntity {

    @ManyToOne
    @JoinColumn(name = "order_id",referencedColumnName = "id")
    private Order orderId;

    @ManyToOne
    @JoinColumn(name = "ticket_chair_id",referencedColumnName = "id")
    private TicketChair ticketChairId;

}
