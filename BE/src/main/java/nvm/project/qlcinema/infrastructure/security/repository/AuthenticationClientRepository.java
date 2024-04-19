package nvm.project.qlcinema.infrastructure.security.repository;

import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.repository.ClientRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthenticationClientRepository extends ClientRepository {

    @Query("""
            SELECT c FROM Client c WHERE c.email = :email
            """)
    Optional<Client> findByEmail(String email);

}
