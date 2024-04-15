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

import java.util.Date;

/**
 * @author Manhnv99
 */

/**
 *  Object TicketChair sẽ là các ghế sẽ được tạo sau khi tạo ShowTime
 *  Người dùng sẽ book những hàng ghế này
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ticket_chair")
public class TicketChair extends PrimaryEntity {

    @Column(name = "chair_name")
    private String chairName;

    @Column(name = "status")
    private boolean status; //false là ghế chưa được book còn true là ghế đã được book rồi

    @ManyToOne
    @JoinColumn(name = "show_time_id",referencedColumnName = "id")
    private ShowTime showTimeId;

    @Column(name = "created_at")
    private Date createdAt;

}
