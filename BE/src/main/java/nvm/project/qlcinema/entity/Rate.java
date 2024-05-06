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
import nvm.project.qlcinema.infrastructure.constant.RateStar;

import java.util.Date;

/**
 * @author Manhnv99
 */

/**
 * Object Genre là sẽ đại diện cho thể loại của 1 phim
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "rate")
public class Rate extends PrimaryEntity {

    @Column(name = "star")
    @Enumerated(EnumType.STRING)
    private RateStar star;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movieId;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client clientId;

    @Column(name = "created_at")
    private Date createdAt;

}
