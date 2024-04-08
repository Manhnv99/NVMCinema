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
 *  Object Director là sẽ đại diện cho phim đấy là do ai dạo diễn
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "director")
public class Director extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "gender")
    private boolean gender; //true là nam, false là nữ

    @Column(name = "age")
    private int age;

    @Column(name = "description")
    private String description;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_at")
    private Date createdAt;

}
