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
 *  Object Chair sẽ đại diễn cho các ghế tại 1 phòng
 *  Mỗi phòng có thể có số lượng ghế khác nhau
 *  Ghế này dùng để khi tạo Showtime thì sẽ generate tự động
 *  Ghế có trạng thái ghế đang hỏng hay không hỏng
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "chair")
public class Chair extends PrimaryEntity  {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "maxRow")
    private int maxRow;

    @Column(name = "status")
    private boolean status; //true là ghế dùng được, false là ghế đang hỏng

    @ManyToOne
    @JoinColumn(name = "room_id" , referencedColumnName = "id")
    private Room roomId;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_at")
    private Date createdAt;

}
