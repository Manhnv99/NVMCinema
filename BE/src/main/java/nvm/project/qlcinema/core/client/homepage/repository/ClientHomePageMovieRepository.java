package nvm.project.qlcinema.core.client.homepage.repository;

import nvm.project.qlcinema.core.client.homepage.model.response.ClientHomePageDetailMovieResponse;
import nvm.project.qlcinema.core.client.homepage.model.response.ClientHomePageListAreaResponse;
import nvm.project.qlcinema.core.client.homepage.model.response.ClientHomePageListMovieCurrentShowingResponse;
import nvm.project.qlcinema.core.client.homepage.model.response.ClientHomePageListMoviePreTicketResponse;
import nvm.project.qlcinema.core.client.homepage.model.response.ClientHomePageListMovieUpComingResponse;
import nvm.project.qlcinema.repository.MovieRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientHomePageMovieRepository extends MovieRepository {

    @Query(value = """
                SELECT  DISTINCT
                        m.id AS id,
                        m.banner_url AS imageUrl,
                        m.name AS movie,
                        m.age_restriction AS ageRestriction,
                        m.subtitle AS subTitle,
                        f.name AS format,
                        g.name AS genre
                FROM showtime st
                JOIN movie m ON st.movie_id = m.id
                JOIN format f ON m.format_id = f.id
                JOIN genre g ON m.genre_id = g.id
                JOIN room r ON st.room_id = r.id
                JOIN branch b ON r.branch_id = b.id
                JOIN area a ON b.area_id = a.id
                WHERE st.screening_date = current_date() AND a.id = :areaId
                """,nativeQuery = true)
    List<ClientHomePageListMovieCurrentShowingResponse> getListMovieCurrentShowing(String areaId);

    @Query(value = """
                SELECT  DISTINCT
                        m.id AS id,
                        m.banner_url AS imageUrl,
                        m.name AS movie,
                        m.age_restriction AS ageRestriction,
                        m.subtitle AS subTitle,
                        f.name AS format,
                        g.name AS genre
                FROM showtime st
                JOIN movie m ON st.movie_id = m.id
                JOIN format f ON m.format_id = f.id
                JOIN genre g ON m.genre_id = g.id
                JOIN room r ON st.room_id = r.id
                JOIN branch b ON r.branch_id = b.id
                JOIN area a ON b.area_id = a.id
                WHERE st.screening_date > current_date() AND a.id = :areaId
                """,nativeQuery = true)
    List<ClientHomePageListMoviePreTicketResponse> getListMoviePreTicket(String areaId);

    @Query(value = """
                SELECT  DISTINCT
                        m.id AS id,
                        m.banner_url AS imageUrl,
                        m.name AS movie,
                        m.age_restriction AS ageRestriction,
                        m.subtitle AS subTitle,
                        f.name AS format,
                        g.name AS genre
                FROM showtime st
                JOIN movie m ON st.movie_id = m.id
                JOIN format f ON m.format_id = f.id
                JOIN genre g ON m.genre_id = g.id
                JOIN room r ON st.room_id = r.id
                JOIN branch b ON r.branch_id = b.id
                JOIN area a ON b.area_id = a.id
                WHERE st.screening_date > current_date() AND a.id = :areaId
                """,nativeQuery = true)
    List<ClientHomePageListMovieUpComingResponse> getListMovieUpComing(String areaId);

    @Query(value = """
            SELECT  a.id AS id,
                    a.name AS name
            FROM area a
            """,nativeQuery = true)
    List<ClientHomePageListAreaResponse> getListArea();

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
                WHERE m.id = :movieId
                """,nativeQuery = true)
    ClientHomePageDetailMovieResponse getDetailMovie(String movieId);

}