package nvm.project.qlcinema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import nvm.project.qlcinema.entity.base.PrimaryEntity;
import nvm.project.qlcinema.entity.listener.MovieListenerRedis;

import java.time.LocalDate;
import java.util.Date;

/**
 * @author Manhnv99
 */

/**
 * Object Movie sẽ đại diễn cho phim áp dụng trên toàn hệ thống!
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "movie")
@ToString
@EntityListeners(MovieListenerRedis.class)
public class Movie extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "duration")
    private int duration;

    @Column(name = "age_restriction")
    private int ageRestriction; // Độ tuổi khuyến kích xem

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "video_path", columnDefinition = "varchar(10000)")
    private String videoPath;

    @Column(name = "banner_id")
    private String bannerId;

    @Column(name = "banner_url")
    private String bannerUrl;

    @Column(name = "actor")
    private String actor;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "subtitle")
    private String subTitle;

    @ManyToOne
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    private Director directorId;

    @ManyToOne
    @JoinColumn(name = "genre_id", referencedColumnName = "id")
    private Genre genreId;

    @ManyToOne
    @JoinColumn(name = "country_id", referencedColumnName = "id")
    private Country countryId;

    @ManyToOne
    @JoinColumn(name = "format_id", referencedColumnName = "id")
    private Format formatId;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_at")
    private Date createdAt;

}
