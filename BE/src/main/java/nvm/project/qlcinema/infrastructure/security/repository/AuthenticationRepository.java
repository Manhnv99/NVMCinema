package nvm.project.qlcinema.infrastructure.security.repository;

import nvm.project.qlcinema.repository.UserRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends UserRepository {
}
