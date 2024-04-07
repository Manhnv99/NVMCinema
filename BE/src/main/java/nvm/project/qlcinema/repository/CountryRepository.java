package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country,String> {
}
