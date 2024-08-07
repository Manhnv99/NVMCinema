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
import nvm.project.qlcinema.infrastructure.constant.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @author Manhnv99
 */

/**
 * Object User sẽ đại diễn cho các User như admin,staff
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "cccd")
    private String cccd;

    @Column(name = "gender")
    private boolean gender;

    @Column(name = "birthday")
    private LocalDate birthDay;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "image_id")
    private String imageId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "status")
    private boolean status;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "area_id", referencedColumnName = "id")
    private Area areaId;

    @ManyToOne
    @JoinColumn(name = "branch_id", referencedColumnName = "id")
    private Branch branchId;

}
