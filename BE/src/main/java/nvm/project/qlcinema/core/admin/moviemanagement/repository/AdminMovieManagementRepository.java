package nvm.project.qlcinema.core.admin.moviemanagement.repository;

import nvm.project.qlcinema.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminMovieManagementRepository extends JpaRepository<Movie,String> {
}
