package nvm.project.qlcinema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nvm.project.qlcinema.entity.base.PrimaryEntity;

import java.time.LocalDate;

/**
 * @author Manhnv99
 */

/**
 *  Object Client là sẽ đại diện cho các khách hàng mua vé online
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "subtitle")
public class Client extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "birthday")
    private LocalDate birthDay;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "province")
    private String province;

    @Column(name = "address_detail")
    private String addressDetail;

    @Column(name = "image_id")
    private String imageId;

    @Column(name = "image_url")
    private String imageUrl;

}
