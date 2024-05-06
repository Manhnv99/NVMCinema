package nvm.project.qlcinema.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
 * Object Country là sẽ đại diện cho phim đấy là thuộc nước nào sản xuất
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "country")
public class Country extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_at")
    private Date createdAt;

}
