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
            SELECT  m.id AS id,
                    m.banner_url AS imageUrl,
                    m.name AS movie,
                    m.age_restriction AS ageRestriction,
                    m.subtitle AS subTitle,
                    f.name AS format,
                    g.name AS genre,
                    COUNT(*) AS count
            FROM movie m
            JOIN format f ON m.format_id = f.id
            JOIN genre g ON m.genre_id = g.id
            JOIN showtime s ON s.movie_id = m.id
            JOIN room r ON s.room_id = r.id
            JOIN branch b ON r.branch_id = b.id
            JOIN area a ON b.area_id = a.id
            WHERE m.release_date <= CURRENT_DATE() AND
                s.screening_date > CURRENT_DATE() AND
                a.id = :areaId
            GROUP BY
            	m.id,m.banner_url,m.name,m.age_restriction,
            	m.subtitle,f.name,g.name
            HAVING COUNT(*) > 0
            """, nativeQuery = true)
    List<ClientHomePageListMovieCurrentShowingResponse> getListMovieCurrentShowing(String areaId);

    @Query(value = """
            SELECT  m.id AS id,
                    m.banner_url AS imageUrl,
                    m.name AS movie,
                    m.age_restriction AS ageRestriction,
                    m.subtitle AS subTitle,
                    f.name AS format,
                    g.name AS genre,
                    COUNT(*) AS count
            FROM movie m
            JOIN format f ON m.format_id = f.id
            JOIN genre g ON m.genre_id = g.id
            JOIN showtime s ON s.movie_id = m.id
            JOIN room r ON s.room_id = r.id
            JOIN branch b ON r.branch_id = b.id
            JOIN area a ON b.area_id = a.id
            WHERE m.release_date > CURRENT_DATE() AND a.id = :areaId
            GROUP BY
            	m.id,m.banner_url,m.name,m.age_restriction,
            	m.subtitle,f.name,g.name
            HAVING COUNT(*) > 0
            """, nativeQuery = true)
    List<ClientHomePageListMoviePreTicketResponse> getListMoviePreTicket(String areaId);

    @Query(value = """
            select
            	m.id as id,
            	m.banner_url as imageUrl,
            	m.name as movie,
            	m.age_restriction as ageRestriction,
            	m.subtitle as subTitle,
            	f.name as format,
            	g.name as genre
            from
            	movie m
            join format f on
            	m.format_id = f.id
            join genre g on
            	m.genre_id = g.id
            where
            	m.release_date > current_date()
            	and
            	m.id not in\s
            	(
            	select
            		m.id as id
            	from
            		movie m
            	join format f on
            		m.format_id = f.id
            	join genre g on
            		m.genre_id = g.id
            	join showtime s on
            		s.movie_id = m.id
            	where
            		m.release_date > CURRENT_DATE()
            	group by
            		m.id,
            		m.banner_url,
            		m.name,
            		m.age_restriction,
            		m.subtitle,
            		f.name,
            		g.name
            	having
            		COUNT(*) > 0
            	)
            """, nativeQuery = true)
    List<ClientHomePageListMovieUpComingResponse> getListMovieUpComing();

    @Query(value = """
            SELECT  a.id AS id,
                    a.name AS name
            FROM area a
            WHERE a.deleted = true
            """, nativeQuery = true)
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
            """, nativeQuery = true)
    ClientHomePageDetailMovieResponse getDetailMovie(String movieId);

}
