package nvm.project.qlcinema.core.client.authentication.repository;

import nvm.project.qlcinema.entity.Client;
import nvm.project.qlcinema.repository.ClientRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientAuthenticationRepository extends ClientRepository {

    @Query("""
            SELECT c FROM Client c WHERE c.email = :email
            """)
    Optional<Client> findByEmail(String email);

    @Query("""
            SELECT c FROM Client c WHERE c.email = :email AND c.password = :password
            """)
    Optional<Client> loginAuthentication(String email, String password);

}
