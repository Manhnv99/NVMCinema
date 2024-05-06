package nvm.project.qlcinema.core.admin.moviemanagement.repository;

import nvm.project.qlcinema.core.admin.moviemanagement.model.request.AdminMovieManagementListMovieRequest;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementDetailMovieResponse;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementGetOneMovieResponse;
import nvm.project.qlcinema.core.admin.moviemanagement.model.response.AdminMovieManagementListMovieResponse;
import nvm.project.qlcinema.entity.Movie;
import nvm.project.qlcinema.repository.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminMovieManagementRepository extends MovieRepository {

    Optional<Movie> findByCode(String code);

    @Query(value = """
            SELECT	m.id AS id,
            		m.code AS code,
                    m.name AS name,
                    m.duration AS duration,
                    m.age_restriction AS ageRestriction,
                    m.release_date AS releaseDate,
                    m.actor AS actor,
                    m.subtitle AS subTitle,
                    m.banner_url AS bannerUrl,
                    d.name AS director,
                    g.name AS genre,
                    c.name AS country,
                    f.name AS format,
                    m.deleted AS deleted
            FROM movie m
            JOIN country c ON m.country_id = c.id
            JOIN director d ON m.director_id = d.id
            JOIN format f ON m.format_id = f.id
            JOIN genre g ON m.genre_id = g.id
            WHERE
            (
                ( :#{#request.name} IS NULL OR m.name LIKE :#{ "%" + #request.name + "%"} ) AND
                ( :#{#request.director} IS NULL OR d.name LIKE :#{ "%" + #request.director + "%"} ) AND
                ( :#{#request.genre} IS NULL OR g.name LIKE :#{ "%" + #request.genre + "%"} ) AND
                ( :#{#request.format} IS NULL OR f.name LIKE :#{ "%" + #request.format + "%"} ) AND
                ( :#{#request.country} IS NULL OR c.name LIKE :#{ "%" + #request.country + "%"} )
            )
            ORDER BY m.created_at DESC
            """, nativeQuery = true)
    Page<AdminMovieManagementListMovieResponse> getSearchListMovie(Pageable pageable, AdminMovieManagementListMovieRequest request);

    @Query(value = """
            SELECT	m.id AS id,
            		m.code AS code,
                    m.name AS name,
                    m.duration AS duration,
                    m.age_restriction AS ageRestriction,
                    m.release_date AS releaseDate,
                    m.video_path AS videoPath,
                    m.banner_url AS bannerUrl,
                    m.actor AS actor,
                    m.description AS description,
                    m.subtitle AS subTitle,
                    d.id AS directorId,
                    g.id AS genreId,
                    c.id AS countryId,
                    f.id AS formatId
            FROM movie m
            JOIN country c ON m.country_id = c.id
            JOIN director d ON m.director_id = d.id
            JOIN format f ON m.format_id = f.id
            JOIN genre g ON m.genre_id = g.id
            WHERE m.id = :id
            """, nativeQuery = true)
    AdminMovieManagementGetOneMovieResponse getOneMovie(String id);

    @Query(value = """
            SELECT	m.id AS id,
            		m.code AS code,
                    m.name AS name,
                    m.duration AS duration,
                    m.age_restriction AS ageRestriction,
                    m.release_date AS releaseDate,
                    m.video_path AS videoPath,
                    m.banner_url AS bannerUrl,
                    m.actor AS actor,
                    m.description AS description,
                    m.subtitle AS subTitle,
                    d.name AS director,
                    g.name AS genre,
                    c.name AS country,
                    f.name AS format,
                    m.deleted AS deleted
            FROM movie m
            JOIN country c ON m.country_id = c.id
            JOIN director d ON m.director_id = d.id
            JOIN format f ON m.format_id = f.id
            JOIN genre g ON m.genre_id = g.id
            WHERE m.id = :id
            """, nativeQuery = true)
    AdminMovieManagementDetailMovieResponse getDetailMovie(String id);

}
