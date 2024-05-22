package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, String> {

    @Query("""
            SELECT c FROM Client c ORDER BY c.createdAt DESC LIMIT 1
            """)
    Optional<Client> getNewest();

}
