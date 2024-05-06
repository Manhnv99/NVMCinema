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
 * Object Comment sẽ đại diễn cho các Comment trong 1 phim được comment bởi người dùng
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "comment")
public class Comment extends PrimaryEntity {

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movieId;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client clientId;

    @Column(name = "created_at")
    private Date createdAt;

}
