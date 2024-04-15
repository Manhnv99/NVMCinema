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

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

/**
 * @author Manhnv99
 */

/**
 *  Object ShowTime sẽ là để admin tạo các giờ chiếu
 *  Và sẽ dựa theo admin là ở cơ sở nào sẽ xem được room của cơ sở đó
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "showtime")
public class ShowTime extends PrimaryEntity {

    @Column(name = "screening_date")
    private LocalDate screeningDate;

    @Column(name = "time_start")
    private Time timeStart;

    @Column(name = "ticket_price")
    private BigDecimal ticketPrice;

    @ManyToOne
    @JoinColumn(name = "movie_id",referencedColumnName = "id")
    private Movie movieId;

    @ManyToOne
    @JoinColumn(name = "room_id",referencedColumnName = "id")
    private Room roomId;

    @Column(name = "deleted")
    private boolean deleted = true;

    @Column(name = "created_at")
    private Date createdAt = new Date();

}
